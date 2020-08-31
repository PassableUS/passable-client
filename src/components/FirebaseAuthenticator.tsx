import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

// Firebase config
import firebase from 'firebase/app';
import { setupStudentInformation } from '../features/login/setupSlice';
import {
  setupFirebaseUid,
  signedOut,
  setupSchool,
  setupRole,
  setupDisplayName,
  setupDistrict,
} from '../features/login/setupSlice';
require('firebase/auth');
require('firebase/firestore');

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

export const auth = firebase.auth();
export const db = firebase.firestore();

const FirebaseAuthentication: React.FC = () => {
  // const getCircularReplacer = () => {
  //   const seen = new WeakSet();
  //   return (key: any, value: any) => {
  //     if (typeof value === 'object' && value !== null) {
  //       if (seen.has(value)) {
  //         return;
  //       }
  //       seen.add(value);
  //     }
  //     return value;
  //   };
  // };

  const handleSession = (userUid: string) => {
    console.log('Setting Session State from Firestore for Uid: ' + userUid + '...');
    db.collection('users')
      .doc(userUid)
      .get()
      .then(doc => {
        // Fetch school info
        const userDocument = doc.data();
        const schoolPath = userDocument.school.path;
        userDocument.school
          .get()
          .then((doc: firebase.firestore.DocumentSnapshot) => {
            dispatch(setupRole(userDocument.role));
            dispatch(setupDisplayName(userDocument.displayName));
            dispatch(
              setupDistrict({
                name: userDocument.district.get().name,
                documentPath: userDocument.district.path,
              })
            );
            dispatch(
              setupSchool({
                documentPath: schoolPath,
                schoolName: doc.data().name,
                roomCategories: doc.data().roomCategories,
              })
            );

            if (userDocument.role === 'student') {
              const studentInfoRef = userDocument.studentInformationReference;
              studentInfoRef.get().then((doc: firebase.firestore.DocumentSnapshot) => {
                const studentInfoData = doc.data();
                dispatch(
                  setupStudentInformation({
                    path: studentInfoRef.path,
                    schoolIssuedStudentId: studentInfoData.schoolIssuedStudentId,
                  })
                );
              });
            }
          })
          .catch((e: firebase.firestore.FirestoreError) =>
            alert('Something went wrong during initialization. Error Message: ' + e.message)
          );
      })
      .catch(e => alert('Something went wrong during initialization. Error Message: ' + e));
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      // This block is only executed if we are authenticated with Firebase. As a result of authenticating, we will try to fetch/sign in to our server.
      if (user) {
        dispatch(setupFirebaseUid(user.uid));
        handleSession(user.uid);
      } else {
        dispatch(signedOut());
      }
    });

    return unsubscribe;
  });

  return null;
};

export default FirebaseAuthentication;
