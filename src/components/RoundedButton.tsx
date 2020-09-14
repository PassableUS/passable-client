import React from 'react';
import { Button, TouchableOpacity, GestureResponderEvent, Text, StyleSheet } from 'react-native';

const RoundedButton = ({
  onPress,
  title,
  size,
  backgroundColor,
  style,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  size: 'sm';
  backgroundColor: string;
  style: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      size === 'sm' && {
        paddingHorizontal: 8,
        paddingVertical: 6,
        elevation: 6,
      },
      backgroundColor && { backgroundColor },
      { ...style },
    ]}>
    <Text style={[styles.appButtonText, size === 'sm' && { fontSize: 14 }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 1000,
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default RoundedButton;
