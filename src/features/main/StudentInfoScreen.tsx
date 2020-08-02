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
import SingleStudentDisplay from '../../components/SingleStudentDisplay';

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
