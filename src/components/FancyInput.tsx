import React, { useState, useEffect } from 'react';
import { TextInputProps, Animated } from 'react-native';
import { TextInput } from 'react-native';

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
