import React from 'react';
import { View } from 'react-native';
import CapacityChecker from './CapacityChecker';
import { ButtonGroup, Text, Button } from '@ui-kitten/components';

interface TimeSelectorProps {
  handleCreatePass: any;
  selectedRoom: any;
  selectedTime: any;
  setSelectedTime: any;
}

const TimeSelector = ({
  handleCreatePass,
  selectedRoom,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) => {
  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <Text style={{ marginBottom: 10 }} category="h1">
        Select Pass Duration
      </Text>
      <CapacityChecker selectedRoom={selectedRoom} />
      <View style={{ width: '100%', alignItems: 'center', alignContent: 'center' }}>
        <Text
          style={{ textAlign: 'center', fontSize: 40, marginBottom: 20, marginTop: 50 }}
          category="h1">
          {selectedTime} minutes
        </Text>
        <ButtonGroup>
          <Button onPress={() => setSelectedTime(selectedTime + 1)}>+</Button>
          <Button onPress={() => setSelectedTime(selectedTime - 1)}>-</Button>
        </ButtonGroup>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
        <Button status="success" onPress={handleCreatePass}>
          Create Pass
        </Button>
      </View>
    </View>
  );
};

export default TimeSelector;
