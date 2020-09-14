import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, GestureResponderEvent, TextInputProps, Animated } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import typography from '../theme/typography';

const FancyInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor="#b9b9bb"
      style={[
        {
          borderRadius: 10,
          backgroundColor: '#efefef',
          paddingVertical: 10,
          paddingHorizontal: 15,
        },
        props.style,
      ]}
      {...props}
    />
  );
};

export default FancyInput;
