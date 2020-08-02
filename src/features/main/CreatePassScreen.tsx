import React from 'react';
import { Text, Button, Spinner, Card, Input, Avatar } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-dynamic-vector-icons';
import {
  CreatePassScreenNavigationProp,
  CreatePassScreenRouteProp,
} from '../../navigation/HomeNavigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Platform, View, StyleSheet, Image, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Camera } from 'expo-camera';
import { Student } from './StudentInfoScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

export const prepareNameSearch = (inputString: string) => {
  const removedSpacesString = inputString.replace(/\s/g, '');
  const lowercasedString = removedSpacesString.toLowerCase();
  return lowercasedString;
};

export const StudentResultItem = ({
  student,
  handleStudentSelect,
}: {
  student: Student;
  handleStudentSelect: any;
}) => {
  return (
    <TouchableOpacity onPress={() => handleStudentSelect(student)}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          source={{
            uri:
              student.profilePictureUri ||
              'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
          }}
        />
        <Text>{student.displayName}</Text>
        <Text>
          {student.grade} | {student.schoolIssuedId}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const StudentSearch = ({ handleStudentSelect }: { handleStudentSelect: Function }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const [searchText, setSearchText] = React.useState('');
  const [matchingUsers, setMatchingUsers] = React.useState<any>();

  const fallbackText = prepareNameSearch(searchText) || 'placeholder';
  const [
    matchingUsersCollection,
    isMatchingUsersCollectionLoading,
    matchingUsersCollectionError,
  ] = useCollectionData<Student>(
    db
      .doc(schoolPath)
      .collection('students')
      .orderBy('searchName')
      .startAt(fallbackText)
      .endAt(fallbackText + '\uf8ff')
      .limit(5),
    { idField: 'uid' }
  );

  // TODO: Display any error

  return (
    <>
      <Input
        placeholder="Search for a student"
        value={searchText}
        onChangeText={(nextValue: string) => setSearchText(nextValue)}
      />

      {isMatchingUsersCollectionLoading && <Spinner />}

      {matchingUsersCollection &&
        matchingUsersCollection.map(student => (
          <StudentResultItem
            student={student}
            key={student.schoolIssuedId}
            handleStudentSelect={handleStudentSelect}
          />
        ))}
    </>
  );
};
const Scanner = ({ handleStudentScan }: { handleStudentScan: Function }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    // Potential source of error, no-op memory leak
    BarCodeScanner.requestPermissionsAsync().then(({ status }) =>
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

const CreatePassScreen = ({
  navigation,
  route,
}: {
  navigation: CreatePassScreenNavigationProp;
  route: CreatePassScreenRouteProp;
}) => {
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

        <Text category="h1" style={{ marginBottom: 5 }}>
          Create Pass
        </Text>

        {route.params.context === 'scan' && (
          <Scanner
            handleStudentScan={(data: any) =>
              navigation.navigate('StudentInfo', {
                schoolIssuedId: data,
                context: 'schoolIssuedId',
              })
            }
          />
        )}
        {route.params.context === 'search' && (
          <StudentSearch
            handleStudentSelect={(student: Student) =>
              navigation.navigate('StudentInfo', { context: 'uid', uid: student.uid })
            }
          />
        )}
      </DefaultLayout>
    </>
  );
};

export default CreatePassScreen;
