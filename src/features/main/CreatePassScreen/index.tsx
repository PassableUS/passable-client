import React from 'react';
import { Text, Button, Spinner, Card, Input, Avatar, ButtonGroup } from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/DefaultLayout';
import { auth, db } from '../../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import Icon from 'react-native-dynamic-vector-icons';

import { Platform } from 'react-native';

import StudentSearch from '../../../components/StudentSearch';
import IDScanner from '../../../components/IDScanner';
import CategorySelector from './CategorySelector';
import TimeSelector from './TimeSelector';
import SpecificRoomSelector from './SpecificRoomSelector';
import {
  CreatePassScreenNavigationProp,
  CreatePassScreenRouteProp,
} from '../../../navigation/HomeScreenNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { Pass, RoomCategory } from '../../../types/school';
import firebase from 'firebase';

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
  const [selectedCategory, setSelectedCategory] = React.useState<RoomCategory>(); // Categories not pulled from Firestore at pass creation (populated Redux Store at app launch)

  const [step, setStep] = React.useState('selectStudent');
  // const [creationStatus, setCreationStatus] = React.useState<string>();
  const [user, userLoading, userError] = useAuthState(auth);

  const { role, studentInformation, displayName } = useSelector((state: RootState) => state.setup);

  const StudentSelector = ({ context }: { context: string }) => {
    // STUDENT CONTEXT: Automatically select the current student if it's a student assigning the role
    React.useEffect(() => {
      if (role === 'student') {
        db.doc(studentInformation.documentPath)
          .get()
          .then(snap => {
            setSelectedStudent({ ref: snap.ref, uid: snap.id, ...snap.data() });
            setStep('selectCategory');
          });
      }
    }, []);

    if (role === 'student') {
      return (
        <Text category="h1">
          Retrieving your information... Context: Student requesting pass...
        </Text>
      );
    }

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

    console.log(displayName);

    // TODO: Track from location
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + selectedTime * 60000);
    const passData: Pass = {
      fromLocation: 'default',
      toLocation: selectedRoom.ref,
      fromLocationName: 'default',
      passColor: selectedCategory.color || '#00BFFF',
      toLocationName: selectedRoom.displayName,
      locationCategory: selectedRoom.category,
      issuingUserName: displayName,
      issuingUser: db.collection('users').doc(user.uid),
      passRecipientUser: selectedStudent.ref,
      passRecipientName: selectedStudent.displayName,
      passSchemaVersion: 1,
      startTime: firebase.firestore.Timestamp.fromDate(new Date()),
      endTime: firebase.firestore.Timestamp.fromDate(futureDate), // use SelectedTime
      iconGroup: selectedCategory.iconGroup,
      iconName: selectedCategory.iconName,
    };

    // setCreationStatus('Assigning student the pass...');
    navigation.navigate('Home');

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
