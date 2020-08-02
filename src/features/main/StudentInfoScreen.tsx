import React from 'react';
import { Text, Button, Spinner, Avatar } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {
  StudentInfoScreenRouteProp,
  StudentInfoScreenNavigationProp,
} from '../../navigation/HomeNavigation';
import { StudentResultItem } from './CreatePassScreen';
import firebase from 'firebase';
import { View } from 'react-native';

export interface Pass {
  fromLocation: firebase.firestore.DocumentReference;
  toLocation: firebase.firestore.DocumentReference;
  fromLocationName: string;
  toLocationName: string;
  issuingUserName: string;
  issuingUser: firebase.firestore.DocumentReference;
  passRecipientName: string;
  passSchemaVersion: number;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  locationCategory: string;
  passColor: string;
}
export interface Student {
  eventsLog: Pass[];
  displayName: string;
  grade: string;
  schoolIssuedId: string;
  profilePictureUri?: string;
  uid: string;
}

const Timer = ({ targetTime, timerTextStyle }: { targetTime: Date; timerTextStyle: any }) => {
  // initialize timeLeft with the seconds prop
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    // exit early when we reach 0
    if (currentTime > targetTime) return <Text>Expired</Text>;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [currentTime]);

  const timeRemainingInSeconds = Math.floor((targetTime.getTime() - currentTime.getTime()) / 1000);
  const minutesRemaining = Math.floor(timeRemainingInSeconds / 60);
  let secondsRemaining: string | number = timeRemainingInSeconds - minutesRemaining * 60;
  secondsRemaining = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;

  return (
    <Text style={timerTextStyle}>
      {minutesRemaining}:{secondsRemaining} remaining
    </Text>
  );
};

const PassCard = ({ passInfo }: { passInfo: Pass }) => {
  function adjustColor(color: any, amount: any) {
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color: any) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        )
    );
  }

  return (
    <View
      style={{
        backgroundColor: passInfo.passColor,
        borderRadius: 15,
        height: 125,
        width: '50%',
        padding: 15,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: '600',
          fontFamily: 'Inter_800ExtraBold',
          fontSize: 20,
          textAlign: 'center',
        }}>
        {passInfo.toLocationName}
      </Text>
      <Timer
        timerTextStyle={{
          color: 'white',
          textAlign: 'center',
          fontSize: 15,
          paddingBottom: 10,
        }}
        targetTime={passInfo.endTime.toDate()}
      />
      {/* <Text style={{ color: 'white' }}>{JSON.stringify(passInfo.endTime)} remaining</Text> */}
      <View
        style={{
          backgroundColor: adjustColor(passInfo.passColor, -20),
          borderRadius: 10,
          padding: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15,
            textAlign: 'center',
          }}>
          {passInfo.issuingUserName}
        </Text>
      </View>
    </View>
  );
};

const StudentActivePasses = ({ student }: { student: Student }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const [cachedTime, setCachedTime] = React.useState(new Date());
  const currentTimeAndDate = new Date();

  const [
    activePassesCollection,
    isActivePassesCollectionLoading,
    activePassesCollectionError,
  ] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('students')
      .doc(student.uid)
      .collection('passes')
      .where('endTime', '>=', cachedTime)
      .limit(5),
    { idField: 'uid' }
  );

  return (
    <>
      {isActivePassesCollectionLoading && <Spinner />}
      {activePassesCollectionError && <Text>{activePassesCollectionError.message}</Text>}
      {activePassesCollection && activePassesCollection.length > 0 ? (
        activePassesCollection.map(pass => (
          <PassCard passInfo={{ passColor: '#00BFFF', ...pass }} />
        ))
      ) : (
        <Text>No active passes found.</Text>
      )}
    </>
  );
};

const SingleStudentDisplay = ({ student }: { student: Student }) => {
  const getNumberWithOrdinal = (n: number) => {
    var s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <>
      <Avatar
        size="giant"
        source={{
          uri:
            student.profilePictureUri ||
            'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
        }}
      />
      <Text category="h1">{student.displayName}</Text>
      <Text category="h4">{getNumberWithOrdinal(parseInt(student.grade))} Grade</Text>
      <Text category="h1" style={{ marginTop: 20, marginBottom: 10 }}>
        Active Passes
      </Text>

      <StudentActivePasses student={student} />
      <Button>View Student History</Button>
    </>
  );
};

const StudentInfoScreen = ({
  navigation,
  route,
}: {
  navigation: StudentInfoScreenNavigationProp;
  route: StudentInfoScreenRouteProp;
}) => {
  // TODO: Potential area of read improvement, you can just take in the data from props when searching for a user rather than subscribing inside this component (tradeoff: you lose live updates)

  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  if (!route.params.context || !route.params[route.params.context])
    return (
      <DefaultLayout>
        <Text category="h1">
          No student search data found. This may be an error. Please return to the previous screen.
        </Text>
      </DefaultLayout>
    );

  // Firebase requires the query to be this object if finding by object ID
  const infoContext =
    route.params.context === 'uid'
      ? firebase.firestore.FieldPath.documentId()
      : route.params.context;

  const [
    matchingUsersCollection,
    isMatchingUsersCollectionLoading,
    matchingUsersCollectionError,
  ] = useCollectionData<Student>(
    db
      .doc(schoolPath)
      .collection('students')
      .where(infoContext, '==', route.params[route.params.context]),
    { idField: 'uid' }
  );

  if (isMatchingUsersCollectionLoading || !matchingUsersCollection)
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );

  if (matchingUsersCollectionError)
    return <Text category="h1">{matchingUsersCollectionError.message}</Text>;

  if (!matchingUsersCollection || matchingUsersCollection.length === 0) {
    return (
      <DefaultLayout>
        <Text category="h1">
          No matching users found for query. Please go back to the previous screen and try again.
        </Text>
        <Text category="h4">
          Query: {route.params[route.params.context]} in field {route.params.context}
        </Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {matchingUsersCollection.length === 1 ? (
        <SingleStudentDisplay student={matchingUsersCollection[0]} />
      ) : (
        <>
          <Text>Multiple Matching Users for Query:</Text>
          <Text>{route.params[route.params.context]}</Text>
          {matchingUsersCollection.map(student => {
            // TODO: Test multiple students returning
            <StudentResultItem
              student={student}
              key={student.schoolIssuedId}
              handleStudentSelect={(student: Student) =>
                navigation.navigate('StudentInfo', { context: 'uid', uid: student.uid })
              }
            />;
          })}
        </>
      )}
    </DefaultLayout>
  );
};

export default StudentInfoScreen;
