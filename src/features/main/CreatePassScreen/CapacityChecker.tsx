import React from 'react';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { Card, Spinner, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { Pass } from '../../../types/school';

function joinSentence(array: any, oxford_comma = true) {
  if (array.length > 1) {
    var lastWord = ' and ' + array.pop();
    if (oxford_comma && array.length > 1) {
      lastWord = ',' + lastWord;
    }
  } else {
    var lastWord = '';
  }
  return array.join(', ') + lastWord;
}

const CapacityChecker = ({ selectedRoom }: any) => {
  // TODO: Optimize this, rerenders and rereads on time increment or decrement

  if (!selectedRoom.ref) {
    return <Text>Capacity information not available: Specific room not selected.</Text>;
  }

  const [currentTime, _] = React.useState(new Date());
  const [activeRoomPasses, loading, error] = useCollectionData<Pass>(
    selectedRoom.ref.collection('passes').where('endTime', '>=', currentTime)
  );

  if (loading) {
    return (
      <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }} category="h1">
          Loading room capacity information...
        </Text>
        <Spinner />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Text>{error.message}</Text>
      </Card>
    );
  }
  const currentCount = activeRoomPasses.length;

  const currentPeopleNames = activeRoomPasses.map(pass => pass.passRecipientName);
  const currentPeopleSentence = joinSentence(currentPeopleNames);

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{ textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontSize: 20 }}
          category="s1">
          Capacity Tracker
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 40,
              textAlign: 'center',
              color: currentCount > selectedRoom.maxPersonCount ? '#f53b57' : '#05c46b',
            }}
            category="h1">
            {currentCount}
          </Text>
          <Text category="h3">/{selectedRoom.maxPersonCount}</Text>
        </View>
        {currentCount ? (
          <>
            <Text style={{ marginTop: 10, fontSize: 14 }}>
              <Text category="s1">{currentPeopleSentence}</Text> {currentCount === 1 ? 'is' : 'are'}{' '}
              currently in the room.
            </Text>
          </>
        ) : (
          <Text category="s1">There is no one currently in the room.</Text>
        )}
      </View>
    </View>
  );
};

export default CapacityChecker;
