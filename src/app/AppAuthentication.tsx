import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';

// Firebase config
import firebase from 'firebase/app';
import { signedIn, signedOut } from '../features/login/authSlice';
require('firebase/auth');
require('firebase/firestore');

// Firebase configuration provided to us by the app creation process
export const firebaseConfig = {
  apiKey: 'AIzaSyA20GOUrO9uk7w-HItfChUWQAsiRHfvkow',
  authDomain: 'passable-a4dba.firebaseapp.com',
  databaseURL: 'https://passable-a4dba.firebaseio.com',
  projectId: 'passable-a4dba',
  storageBucket: 'passable-a4dba.appspot.com',
  messagingSenderId: '397657248582',
  appId: '1:397657248582:web:c4cda4fca6f0a996480b47',
  measurementId: 'G-0VMMSRKJNR',
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

export const auth = firebase.auth();
export const db = firebase.firestore();

const AppAuthentication: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          dispatch(signedIn({ status: 'in', token }));
        } else {
          // Check if refresh is required.
          const claimsRef = firebase.database().ref('claims/' + user.uid + '/refreshTime');

          claimsRef.on('value', async data => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            dispatch(signedIn({ status: 'in', token }));
          });
        }
      } else {
        // Data is cleared 5 seconds after sign out
        setTimeout(() => {
          dispatch(signedOut());

          console.log('Dispatched sign out');
        }, 5000);
      }
    });

    return unsubscribe;
  });

  return null;
};

export default AppAuthentication;
