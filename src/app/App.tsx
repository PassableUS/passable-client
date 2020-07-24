import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Provider } from 'react-redux';

import store from './store';

import AppNavigation from '../navigation/AppNavigation';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import FirebaseAuthentication from '../components/FirebaseAuthenticator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />

      <FirebaseAuthentication />
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
