import React from 'react';
import {
  Text,
  Button,
  Spinner,
  Card,
  Input,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function(txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const ProfileScreen = () => {
  const [user, isAuthLoading, authError] = useAuthState(auth);
  const [schoolData, setSchoolData] = React.useState<firebase.firestore.DocumentData>();
  const [userData, setUserData] = React.useState<firebase.firestore.DocumentData>();

  const roles = ['Student', 'Teacher', 'Admin'];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = roles[selectedIndex.row];

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

      <Select
        label="Switch Context"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index as IndexPath)}>
        <SelectItem title="Student" />
        <SelectItem title="Teacher (if account permitted)" />
        <SelectItem title="Administrator (if account permitted)" />
      </Select>

      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
