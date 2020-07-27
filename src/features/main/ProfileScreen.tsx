import React from 'react';
import { Text, Button } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth } from '../../components/FirebaseAuthenticator';

const ProfileScreen = () => {
  return (
    <DefaultLayout>
      <Text>You are on the profile screen</Text>
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default ProfileScreen;
