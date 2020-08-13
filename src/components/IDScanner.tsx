import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

const IDScanner = ({ handleStudentScan }: { handleStudentScan: Function }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    // Potential source of error, no-op memory leak
    BarCodeScanner.requestPermissionsAsync().then(({ status }: any) =>
      setHasPermission(status === 'granted')
    );
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera access to initiate scanning...</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text>
        No access to camera. Please open your settings and allow this app to access your camera.
      </Text>
    );
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    handleStudentScan(data);
  };

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
      }}>
      <Text category="h6" style={{ marginBottom: 10 }}>
        Position the ID's barcode in frame
      </Text>
      <View style={{ flex: 3, borderRadius: 20 }}>
        <Camera
          style={[
            {
              flex: 1,
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.code39],
          }}
          onBarCodeScanned={data => {
            handleBarCodeScanned(data);
          }}>
          <LottieView
            loop
            autoPlay
            style={{
              width: '100%',
            }}
            source={require('../assets/barcodeScanning.json')}
          />
        </Camera>
      </View>
      <View style={{ flex: 1 }}></View>

      {scanned && <Button onPress={() => setScanned(false)}>Scan Again?</Button>}
    </View>
  );
};

export default IDScanner;
