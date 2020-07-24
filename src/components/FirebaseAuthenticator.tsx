import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setFirebaseToken, signedOut, fetchSessionProfile } from '../app/sessionSlice';
import { AppDispatch } from '../app/store';

// Firebase config
import firebase from 'firebase/app';
import { SerializedError } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
require('firebase/auth');

// Firebase configuration provided to us by the app creation process
export const firebaseConfig = {
  apiKey: 'AIzaSyDShcJTcdshbb7K4-nUo5_QPISL_nWwqQQ',
  authDomain: 'nocap-d8f2e.firebaseapp.com',
  databaseURL: 'https://nocap-d8f2e.firebaseio.com',
  projectId: 'nocap-d8f2e',
  storageBucket: 'nocap-d8f2e.appspot.com',
  messagingSenderId: '597176381183',
  appId: '1:597176381183:web:b87f0ab57db7cd92cf66ca',
  measurementId: 'G-F6V3QGNVZV',
};

// Initializes Firebase and creates an app instance
try {
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
} catch (err) {
  // Catches 'already initialized' errors and logs it to enable hot reloading to continue to work
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}

const FirebaseAuthentication: React.FC = () => {
  const handleSession = () => {
    dispatch(fetchSessionProfile()).catch((serializedError: SerializedError) => {
      Alert.alert(
        'Something went wrong :(',
        JSON.stringify(serializedError),
        // TODO: Remove cancel option
        [{ text: 'Try Again', onPress: handleSession }, { text: 'Cancel (DEBUG ONLY)' }],

        { cancelable: false }
      );
    });
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      // This block is only executed if we are authenticated with Firebase. As a result of authenticating, we will try to fetch/sign in to our server.
      if (user) {
        user
          .getIdToken()
          .then(token => dispatch(setFirebaseToken(token)))
          .then(handleSession);
      } else {
        dispatch(signedOut());
      }
    });

    return unsubscribe;
  });

  return null;
};

export default FirebaseAuthentication;
