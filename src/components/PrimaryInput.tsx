import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import tailwind from 'tailwind-rn';

const PrimaryInput = (props: any) => {
  return (
    <TextInput
      style={tailwind(
        'w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 h-12'
      )}
      {...props}
    />
  );
};

export default PrimaryInput;
