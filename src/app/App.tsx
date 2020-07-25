import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Provider } from 'react-redux';

import store from './store';

import AppNavigation from '../navigation/AppNavigation';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import FirebaseAuthentication from '../components/FirebaseAuthenticator';
import { StatusBar } from 'react-native';

// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />

        <FirebaseAuthentication />
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;
