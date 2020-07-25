import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setFirebaseToken, signedOut, fetchSessionProfile } from '../app/sessionSlice';
import { AppDispatch } from '../app/store';

// Firebase config
import firebase from 'firebase/app';
// import { SerializedError } from '@reduxjs/toolkit';
// import { Alert } from 'react-native';
require('firebase/auth');

// Firebase configuration provided to us by the app creation process
export const firebaseConfig = {
  apiKey: 'AIzaSyCNndD1hMiAR-yRuuLxSjRvViQGwcvLO0U',
  authDomain: 'safepass-76e29.firebaseapp.com',
  databaseURL: 'https://safepass-76e29.firebaseio.com',
  projectId: 'safepass-76e29',
  storageBucket: 'safepass-76e29.appspot.com',
  messagingSenderId: '1063383168752',
  appId: '1:1063383168752:web:1a3cad3e80d7c3df877435',
  measurementId: 'G-SS5PFW3G9L',
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
  // const handleSession = () => {
  //   dispatch(fetchSessionProfile()).catch((serializedError: SerializedError) => {
  //     Alert.alert(
  //       'Something went wrong :(',
  //       JSON.stringify(serializedError),
  //       // TODO: Remove cancel option
  //       [{ text: 'Try Again', onPress: handleSession }, { text: 'Cancel (DEBUG ONLY)' }],

  //       { cancelable: false }
  //     );
  //   });
  // };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      // This block is only executed if we are authenticated with Firebase. As a result of authenticating, we will try to fetch/sign in to our server.
      if (user) {
        user.getIdToken().then(token => dispatch(setFirebaseToken(token)));
        // .then(handleSession);
      } else {
        dispatch(signedOut());
      }
    });

    return unsubscribe;
  });

  return null;
};

export default FirebaseAuthentication;
