import React from 'react';
import { Text, Button, Spinner, Card } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-dynamic-vector-icons';
import {
  CreatePassScreenNavigationProp,
  CreatePassScreenRouteProp,
} from '../../navigation/HomeNavigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Platform, View, StyleSheet, Image, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Camera } from 'expo-camera';

const StudentSearch = () => {};

const CreatePassScreen = ({
  navigation,
  route,
}: {
  navigation: CreatePassScreenNavigationProp;
  route: CreatePassScreenRouteProp;
}) => {
  const Scanner = () => {
    // TODO: ONLY CAN BE USED INSIDE THE CREATEPASS SCREEN
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
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
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      navigation.navigate('StudentInfo', { id: data });
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
          {/* <BarCodeScanner
            style={[
              StyleSheet.absoluteFillObject,
              {
                flex: 1,
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onBarCodeScanned={handleBarCodeScanned}>
           
          </BarCodeScanner> */}
          <Camera
            style={[
              StyleSheet.absoluteFillObject,
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
            onBarCodeScanned={handleBarCodeScanned}>
            <LottieView
              loop
              autoPlay
              style={{
                width: '100%',
              }}
              source={require('../../assets/barcodeScanning.json')}
            />
          </Camera>
        </View>
        <View style={{ flex: 1 }}></View>

        {scanned && <Button onPress={() => setScanned(false)}>Scan Again?</Button>}
      </View>
    );
  };

  const [user, isAuthLoading, authError] = useAuthState(auth);
  // const [schoolData, setSchoolData] = React.useState<firebase.firestore.DocumentData>();
  // const [userData, setUserData] = React.useState<firebase.firestore.DocumentData>();
  // // const [userDoc, isUserDocLoading, userDocError] = useDocumentData(
  // //   db.collection('users').doc(user.uid)
  // // );
  // React.useEffect(() => {
  //   console.log('Fetching Firebase Data: User Profile Information && School Data');
  //   const unsubscribe = db
  //     .collection('users')
  //     .doc(user.uid)
  //     .onSnapshot(doc => {
  //       const profileData = doc.data();
  //       setUserData(profileData);
  //       profileData.school
  //         .get()
  //         .then((doc: firebase.firestore.DocumentSnapshot) => setSchoolData(doc.data()));
  //     });

  //   return unsubscribe;
  // }, []);

  // if (!userData || !schoolData)
  //   return (
  //     <DefaultLayout>
  //       <Spinner />
  //     </DefaultLayout>
  //   );

  if (Platform.OS === 'web' && route.params.context === 'scan') {
    alert(
      'Barcode scanning on the web version is not supported yet. Please use the manual search to add passes on the web'
    );
    navigation.goBack();
    return <Text>Web is not supported yet</Text>;
  }

  return (
    <>
      <DefaultLayout>
        <Icon
          name="md-close-circle"
          type="Ionicons"
          size={35}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text category="h1" style={{ marginBottom: 20 }}>
          {route.params.context}
        </Text>

        <Text category="h1" style={{ marginBottom: 5 }}>
          Create Pass
        </Text>

        {route.params.context === 'scan' && <Scanner />}

        {/* <Text category="h2">{user.displayName}</Text>
      <Text category="h3">{userData.role}</Text>
      <Text category="p1">{schoolData.name}</Text>
      <Button onPress={() => auth.signOut()}>Sign out</Button> */}
      </DefaultLayout>
    </>
  );
};

export default CreatePassScreen;
