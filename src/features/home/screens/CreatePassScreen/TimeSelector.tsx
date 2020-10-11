import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CapacityChecker from './CapacityChecker';
import { ButtonGroup, Text, Button } from '@ui-kitten/components';
import Icon from 'react-native-dynamic-vector-icons';

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
    <View style={{ display: 'flex', flex: 1, height: '100%' }}>
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
        <TouchableOpacity
          onPress={handleCreatePass}
          style={{ backgroundColor: '#2253ff', padding: 20, borderRadius: 10, marginTop: 10 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="plus"
              type="FontAwesome"
              size={20}
              color="white"
              // onPress={() => {
              //   navigation.goBack();
              // }}
            />
            <Text
              category="s1"
              style={{
                marginLeft: 10,
                color: 'white',
                fontSize: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              Create Pass
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeSelector;
