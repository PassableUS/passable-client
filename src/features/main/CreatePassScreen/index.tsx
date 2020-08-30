import React from 'react';
import { Text, Button, Spinner, Card, Input, Avatar, ButtonGroup } from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/DefaultLayout';
import { auth, db } from '../../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import Icon from 'react-native-dynamic-vector-icons';
import {
  CreatePassScreenNavigationProp,
  CreatePassScreenRouteProp,
} from '../../../navigation/HomeNavigation';

import { Platform } from 'react-native';

import StudentSearch from '../../../components/StudentSearch';
import IDScanner from '../../../components/IDScanner';
import CategorySelector from './CategorySelector';
import TimeSelector from './TimeSelector';
import SpecificRoomSelector from './SpecificRoomSelector';

export interface Room {
  category: string;
  displayName: string;
  maxPersonCount: number;
}

export interface RoomCategory {
  categorySpecifier: string;
  color: string;
  displayName: string;
  iconGroup: string;
  iconName: string;
  studentsRequireApproval: boolean;
}

const CreatePassScreen = ({
  navigation,
  route,
}: {
  navigation: CreatePassScreenNavigationProp;
  route: CreatePassScreenRouteProp;
}) => {
  const [selectedStudent, setSelectedStudent] = React.useState<firebase.firestore.DocumentData>();
  const [selectedRoom, setSelectedRoom] = React.useState<firebase.firestore.DocumentData>();
  const [selectedTime, setSelectedTime] = React.useState(5);
  const [selectedCategory, setSelectedCategory] = React.useState<any>();

  const [step, setStep] = React.useState('selectStudent');
  const [creationStatus, setCreationStatus] = React.useState<string>();
  const [user, userLoading, userError] = useAuthState(auth);

  const StudentSelector = ({ context }: { context: string }) => {
    return (
      <>
        <Text category="h1">Student Search</Text>
        <Text category="s1" style={{ marginBottom: 10 }}>
          Search for any student in your school.
        </Text>
        {context === 'scan' && (
          // TODO: FIX HANDLING OF SCANNER
          <IDScanner
            handleStudentScan={(data: any) =>
              navigation.navigate('StudentInfo', {
                schoolIssuedStudentId: data,
                context: 'schoolIssuedStudentId',
              })
            }
          />
        )}
        {context === 'search' && (
          <StudentSearch
            handleStudentSelect={(student: firebase.firestore.DocumentData) => {
              setSelectedStudent(student);

              setStep('selectCategory');
            }}
          />
        )}
      </>
    );
  };

  if (Platform.OS === 'web' && route.params.context === 'scan') {
    alert(
      'Barcode scanning on the web version is not supported yet. Please use the manual search to add passes on the web'
    );
    navigation.goBack();
    return <Text>Web is not supported yet</Text>;
  }

  const handleCreatePass = () => {
    if (!user) {
      return alert('Please retry, failed to initialize user.');
    }

    console.log('Selected category color: ', selectedCategory.color);

    // TODO: Track from location
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + selectedTime * 60000);
    const passData = {
      fromLocation: 'default',
      toLocation: selectedRoom.ref,
      fromLocationName: 'default',
      passColor: selectedCategory.color || '#00BFFF',
      toLocationName: selectedRoom.displayName,
      locationCategory: selectedRoom.category,
      issuingUserName: user.displayName,
      issuingUser: db.collection('users').doc(user.uid),
      passRecipientName: selectedStudent.displayName,
      passSchemaVersion: 1,
      startTime: new Date(),
      endTime: futureDate, // use SelectedTime
    };

    // setCreationStatus('Assigning student the pass...');
    selectedStudent.ref
      .collection('passes')
      .add(passData)
      .then(() => {
        // setCreationStatus('Updating school records...');

        // TODO: Address whether to access .school or .parent in order to access the school from the parent
        // selectedStudent.school
        //   .collection('passes')
        const studentsCollectionRef = selectedStudent.ref.parent;
        const schoolDocRef = studentsCollectionRef.parent;
        schoolDocRef
          .collection('passes')
          .add(passData)
          .then(() => {
            // setCreationStatus('Updating room records...');
            if (selectedRoom.ref) {
              selectedRoom.ref
                .collection('passes')
                .add(passData)
                .then(() => {
                  // setCreationStatus('Successfully created pass.');
                  alert('Successfully created pass!');
                  navigation.navigate('Home');
                })
                .catch((e: any) => alert(e.message));
            } else {
              console.log('No selected room reference. Creating general pass...');
              alert('Successfully created pass!');
              navigation.navigate('Home');
            }
          })
          .catch((e: any) => alert(e.message));
      })
      .catch((e: any) => alert(e.message));
  };

  return (
    <>
      <DefaultLayout>
        <Icon
          style={{ marginTop: 20, marginBottom: 30 }}
          name="md-close-circle"
          type="Ionicons"
          size={35}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />

        {step === 'selectStudent' && <StudentSelector context={route.params.context} />}
        {step === 'selectCategory' && (
          <CategorySelector setSelectedCategory={setSelectedCategory} setStep={setStep} />
        )}
        {step === 'selectRoom' && (
          <SpecificRoomSelector
            category={selectedCategory}
            setSelectedRoom={setSelectedRoom}
            setStep={setStep}
          />
        )}
        {step === 'selectTime' && (
          <TimeSelector
            handleCreatePass={handleCreatePass}
            selectedRoom={selectedRoom}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}
      </DefaultLayout>
    </>
  );
};

export default CreatePassScreen;
