import React from 'react';
import { Text, Button } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth } from '../../components/FirebaseAuthenticator';

const HomeScreen = () => {
  return (
    <DefaultLayout>
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default HomeScreen;
