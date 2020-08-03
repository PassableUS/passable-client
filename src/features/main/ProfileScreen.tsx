import React from 'react';
import { Text, Button, Spinner, Card } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';

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

  if (!userData || !schoolData)
    return (
      <DefaultLayout>
        <Spinner />
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
      <Text category="h1" style={{ marginTop: 20, marginBottom: 20 }}>
        Profile
      </Text>

      <Card header={Header} style={{ marginBottom: 20 }}>
        <Text category="h5">{schoolData.name}</Text>
      </Card>

      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
