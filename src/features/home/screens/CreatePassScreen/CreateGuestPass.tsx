import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

import { ButtonGroup, Text, Button, Datepicker, Input } from '@ui-kitten/components';

const CreateGuestPass = () => {
  const [date, setDate] = React.useState(new Date());
  const [name, setName] = React.useState('');

  const [start, setStart] = React.useState(new Date('1900-12-17T03:24:00'));

  const [selectedTime, setSelectedTime] = React.useState(30);

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <Text style={{ marginBottom: 10 }} category="h1">
        Create Guest Pass
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: 'black', padding: 20, borderRadius: 10, marginTop: 10 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="camera"
            type="FontAwesome"
            size={20}
            color="white"
            // onPress={() => {
            //   navigation.goBack();
            // }}
          />
          <Text
            style={{
              marginLeft: 10,
              color: 'white',
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Scan License
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ width: '100%', alignItems: 'flex-start', alignContent: 'center' }}>
        <Input
          style={styles.formInput}
          placeholder="What's your name?"
          label="Full Name"
          value={name}
          onChangeText={nextValue => setName(nextValue)}
        />

        <Datepicker
          style={styles.formInput}
          label="Birth Date"
          placeholder="Select your birth date"
          min={start}
          date={date}
          onSelect={nextDate => setDate(nextDate)}
        />

        <Text category="s1" style={styles.formInput}>
          This pass will last for {selectedTime} minutes
        </Text>

        <ButtonGroup>
          <Button onPress={() => setSelectedTime(selectedTime + 1)}>+</Button>
          <Button onPress={() => setSelectedTime(selectedTime - 1)}>-</Button>
        </ButtonGroup>
      </View>

      <TouchableOpacity
        style={{
          borderColor: 'black',
          borderWidth: 2,
          padding: 20,
          borderRadius: 10,
          borderStyle: 'dashed',
          marginTop: 30,
          width: 200,
          height: 200,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}>
          <Icon
            name="camera"
            type="FontAwesome"
            size={30}
            color="black"
            // onPress={() => {
            //   navigation.goBack();
            // }}
          />
          <Text
            category="s1"
            style={{
              marginTop: 10,
              color: 'black',
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Take Profile Picture
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
        <TouchableOpacity
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

const styles = StyleSheet.create({
  formInput: {
    marginTop: 30,
    width: '100%',
  },
});

export default CreateGuestPass;
