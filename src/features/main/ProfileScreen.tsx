import React from 'react';
import { Text, Button, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export interface UserProfile {}

const ProfileScreen = () => {
  const [user, isAuthLoading, authError] = useAuthState(auth);
  const [schoolData, setSchoolData] = React.useState();

  const [userDoc, isUserDocLoading, userDocError] = useDocumentData(
    db.collection('users').doc(user.uid)
  );
  React.useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .get();

    return unsubscribe;
  }, []);

  if (isAuthLoading || isUserDocLoading) return <Spinner />;

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Profile
      </Text>
      <Text category="h3">{JSON.stringify(userDoc.role)} f</Text>
      <Text category="h4">{JSON.stringify(schoolData)}</Text>

      <Text category="h2">{user.displayName}</Text>
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
