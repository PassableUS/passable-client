import React, { useState, useEffect } from 'react';
import { TextInputProps, Animated } from 'react-native';
import { TextInput } from 'react-native';
import { Input } from '@ui-kitten/components';

const FancyInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <Input
      placeholderTextColor="#929296"
      size="large"
      {...props}
      style={[
        {
          borderRadius: 10,
          // height: 50,
          backgroundColor: '#f1f1f1',
          // paddingVertical: 10,
          // paddingHorizontal: 20,
        },
        props.style,
      ]}
    />
  );
};

export default FancyInput;
