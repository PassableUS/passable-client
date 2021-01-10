import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AppNavigation from './AppNavigation';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar, Platform } from 'react-native';

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

// Magnus
import { ThemeProvider } from 'react-native-magnus';

import {
  useFonts,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_300Light,
} from '@expo-google-fonts/inter';
import LoadingScreen from '../features/loader/LoadingScreen';
import { decode, encode } from 'base-64';
import { useSelector } from 'react-redux';
import AppAuthentication from './AppAuthentication';
import { RootState } from './rootReducer';
import { getMainDefinition } from '@apollo/client/utilities';
import ProfileManager from './ProfileManager';

// Firebase Fixdeclare global {const globalAny:any = global;
if (Platform.OS !== 'web') {
  const globalAny: any = global;

  globalAny.crypto = require('@firebase/firestore');
  globalAny.crypto.getRandomValues = (byteArray: any) => {
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = Math.floor(256 * Math.random());
    }
  };
  if (!globalAny.btoa) {
    globalAny.btoa = encode;
  }
  if (!globalAny.atob) {
    globalAny.atob = decode;
  }
}

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
    components: {},
    strict: strictTheme,
    test: '',
  };

  // Apollo Setup
  const authState = useSelector((state: RootState) => state.auth);
  const isIn = authState.status === 'in';
  const headers = isIn ? { Authorization: `Bearer ${authState.token}` } : {};

  const httpLink = new HttpLink({
    uri: 'https://apt-chamois-59.hasura.app/v1/graphql',
    headers,
  });

  const wsLink = new WebSocketLink({
    uri: 'wss://apt-chamois-59.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  StatusBar.setBarStyle('dark-content', true);

  if (!fontsLoaded && Platform.OS != 'web') {
    return <LoadingScreen context="Loading Fonts..." />;
  }

  return (
    // Redux wrappers are found inside the AppAuthenticationWrapper component
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light} customMapping={customMapping}>
        <ThemeProvider>
          <AppAuthentication />
          <ProfileManager />
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
