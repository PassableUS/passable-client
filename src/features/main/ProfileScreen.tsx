import React from 'react';
import { Text, Button, Spinner, Card, Input } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const ProfileScreen = () => {
  const [user, isAuthLoading, authError] = useAuthState(auth);
  const [schoolData, setSchoolData] = React.useState<firebase.firestore.DocumentData>();
  const [userData, setUserData] = React.useState<firebase.firestore.DocumentData>();
  // const [userDoc, isUserDocLoading, userDocError] = useDocumentData(
  //   db.collection('users').doc(user.uid)
  // );
  React.useEffect(() => {
    console.log('Fetching Firebase Data: User Profile Information && School Data');
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot(doc => {
        const profileData = doc.data();
        setUserData(profileData);
        profileData.school
          .get()
          .then((doc: firebase.firestore.DocumentSnapshot) => setSchoolData(doc.data()));
      });

    return unsubscribe;
  }, []);

  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const districtUid = useSelector((state: RootState) => state.setup.district.id);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');

  const handleCreateTeacher = () => {
    let res: firebase.auth.UserCredential;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        const documentData = {
          displayName,
          role: 'teacher',
          district: db.collection('districts').doc(districtUid),
          school: schoolPath,
        };

        db.collection('users')
          .doc(res.user.uid)
          .set(documentData);
        res = result;
        return result.user.updateProfile({
          displayName: displayName,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (!userData || !schoolData)
    return (
      <DefaultLayout>
        <Spinner />
        <Button onPress={() => auth.signOut()}>Sign out</Button>
      </DefaultLayout>
    );

  const Header = (props: any) => (
    <View {...props}>
      <Text category="h1">{user.displayName}</Text>
      <Text category="s1">{toTitleCase(userData.role)}</Text>
    </View>
  );

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginTop: 30, marginBottom: 20 }}>
        Profile
      </Text>

      <Card header={Header} style={{ marginBottom: 20 }}>
        <Text category="h5">{schoolData.name}</Text>
      </Card>

      {/* <Input placeholder="Email" onChangeText={text => setEmail(text)} />
      <Input placeholder="Password" onChangeText={text => setPassword(text)} />
      <Input placeholder="Display Name" onChangeText={text => setDisplayName(text)} />
      <Button onPress={handleCreateTeacher}>Create Teacher</Button> */}

      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
