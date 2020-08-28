import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Card, Spinner, Text } from '@ui-kitten/components';
import { View } from 'react-native';

const CapacityChecker = ({ selectedRoom }: any) => {
  // TODO: Optimize this, rerenders and rereads on time increment or decrement

  if (!selectedRoom.ref) {
    return <Text>Capacity information not available: Specific room not selected.</Text>;
  }

  const [currentTime, _] = React.useState(new Date());
  const [activeRoomPasses, loading, error] = useCollection(
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
  const currentCount = activeRoomPasses.docs.length;

  return (
    <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
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
            color: currentCount > selectedRoom.maxPersonCount ? 'red' : 'green',
          }}
          category="h1">
          {currentCount}
        </Text>
        <Text category="h3">/{selectedRoom.maxPersonCount}</Text>
      </View>
    </Card>
  );
};

export default CapacityChecker;
