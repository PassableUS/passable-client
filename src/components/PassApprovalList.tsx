import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import PassList from './PassList';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import PassRequestCard from './PassRequestCard';
import { PassRequest } from '../types/school';

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

  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {requestedPasses.docs.map(request => (
        <PassRequestCard
          style={{
            flex: 1,
            minWidth: 150,
            margin: 5,
          }}
          requestSnapshot={request}
        />
      ))}
    </View>
  );
};

export default PassApprovalList;
