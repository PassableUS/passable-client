import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image width={25} height={25} source={require('../../assets/preloader.gif')} />

      <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Syncing...</Text>
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
