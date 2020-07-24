import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { fetchSessionProfile } from '../../app/sessionSlice';
import { unwrapResult, SerializedError } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';

const HomeScreen = () => {
  const [responseText, setResponseText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Welcome`}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>{responseText}</Text>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '40%',
    marginBottom: '10%',
  },
  card: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 15,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    borderRadius: 6,
    alignItems: 'center',
  },
  noteList: {
    width: '100%',
  },
  noteText: {
    marginHorizontal: 10,
    width: '80%',
  },
  reset: {
    marginTop: 15,
  },
});

export default HomeScreen;
