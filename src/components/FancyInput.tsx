import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, GestureResponderEvent, TextInputProps, Animated } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import typography from '../theme/typography';

const FancyInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor="#929296"
      {...props}
      style={[
        {
          borderRadius: 10,
          height: 50,
          backgroundColor: '#efefef',
          paddingVertical: 10,
          paddingHorizontal: 20,
        },
        props.style,
      ]}
    />
  );
};

export default FancyInput;
