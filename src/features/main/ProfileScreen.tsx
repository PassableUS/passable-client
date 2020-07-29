import React from 'react';
import { Text, Button, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProfileScreen = () => {
  const [user, loading, error] = useAuthState(auth);
  user.updateProfile({
    displayName: 'Jane Tester',
  });

  if (loading) return <Spinner />;

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Profile
      </Text>
      <Text category="h2">{user.displayName}</Text>
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
