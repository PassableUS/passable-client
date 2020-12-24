import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const LoadingScreen = ({ context }: { context?: string }) => {
  return (
    <View style={styles.container}>
      {/* <Spinner size="lg" /> */}

      <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Loading..</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{context}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
