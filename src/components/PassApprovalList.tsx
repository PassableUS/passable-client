import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import PassList from './PassList';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

const PassApprovalList = () => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const userUid = useSelector((state: RootState) => state.setup.userUid);

  const [requestedPasses, isLoadingRequestedPasses, requestedPassesError] = useCollection(
    db
      .doc(schoolPath)
      .collection('requests')
      .where('requestRecipient', '==', db.collection('users').doc(userUid))
      .where('addressed', '==', false)
  );

  if (!requestedPasses) return <Text>You have no requested passes at this time</Text>;
  if (requestedPasses) {
    console.log('Discovered:', requestedPasses.docs.length);
  }

  return (
    <View>
      {requestedPasses.docs.map(snap => (
        <Text>There's a pass here</Text>
      ))}
    </View>
  );
};

export default PassApprovalList;
