import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Provider } from 'react-redux';

import store, { persistor } from './store';

import AppNavigation from '../navigation/AppNavigation';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import FirebaseAuthentication from '../components/FirebaseAuthenticator';
import { StatusBar } from 'react-native';

// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <FirebaseAuthentication />
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
