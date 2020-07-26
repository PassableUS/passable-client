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
import { ApplicationProvider } from '@ui-kitten/components';
import { PersistGate } from 'redux-persist/integration/react';

import {
  useFonts,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_300Light,
} from '@expo-google-fonts/inter';
import LoadingScreen from '../features/loader/LoadingScreen';

const App = () => {
  // Begin Custom Font Loading and Override
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
    Inter_600SemiBold,
    Inter_300Light,
  });

  const strictTheme = {
    'text-font-family': 'Inter_400Regular',

    'text-heading-1-font-size': 30,
    'text-heading-1-font-weight': '800',
    'text-heading-1-font-family': 'Inter_800ExtraBold',

    'text-subtitle-1-font-size': 15,
    'text-subtitle-1-font-weight': '600',
    'text-subtitle-1-font-family': 'Inter_600SemiBold',

    'text-paragraph-1-font-size': 12,
    'text-paragraph-1-font-weight': '300',
    'text-paragraph-1-font-family': 'Inter_300Light',

    'text-caption-1-font-size': 12,
    'text-caption-1-font-weight': '400',
    'text-caption-1-font-family': 'Inter_400Regular',

    'text-label-font-size': 12,
    'text-label-font-weight': '600',
    'text-label-font-family': 'Inter_600SemiBold',
  };
  const customMapping = {
    ...eva.mapping,
    strict: { ...eva.mapping.strict, ...strictTheme },
  };

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }
  // End Custom Font Loading and Override

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.light} mapping={customMapping}>
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
