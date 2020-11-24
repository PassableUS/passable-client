import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../app/AppAuthentication';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import FancyInput from '../../components/FancyInput';

const RoomScreen = () => {
  // const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);=

  return (
    <DefaultLayout scrollable>
      <Text category="h1" style={{ marginTop: 30, marginBottom: 20 }}>
        Rooms
      </Text>
      <FancyInput placeholder="Search for a room" />
    </DefaultLayout>
  );
};

export default RoomScreen;
