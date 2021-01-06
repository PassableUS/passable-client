import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

const PageHeading = () => {
  return (
    <View
      style={{
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
      }}>
      <Text>Example Text</Text>
    </View>
  );
};

export default PageHeading;
