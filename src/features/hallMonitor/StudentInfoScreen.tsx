import React from 'react';
import { Text, Button, Spinner, Avatar } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../app/AppAuthentication';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import firebase from 'firebase';
import { View } from 'react-native';
import SingleStudentDisplay from '../../components/SingleStudentDisplay';
import Icon from 'react-native-dynamic-vector-icons';
import StudentSearchResultItem from '../../components/StudentSearchResultItem';
import {
  StudentInfoScreenNavigationProp,
  StudentInfoScreenRouteProp,
} from './HallMonitorNavigation';
import { Student } from '../../types/school';

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
          Context: {route.params.context} | Context Resolved: {route.params[route.params.context]}
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
  ] = useCollection(
    db
      .doc(schoolPath)
      .collection('students')
      .where(infoContext, '==', route.params[route.params.context])
  );

  if (isMatchingUsersCollectionLoading || !matchingUsersCollection)
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );

  if (matchingUsersCollectionError)
    return <Text category="h1">{matchingUsersCollectionError.message}</Text>;

  if (!matchingUsersCollection || matchingUsersCollection.docs.length === 0) {
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
      {matchingUsersCollection.docs.length === 1 ? (
        <SingleStudentDisplay student={matchingUsersCollection.docs[0]} />
      ) : (
        <>
          <Text>Multiple Matching Users for Query:</Text>
          <Text>{route.params[route.params.context]}</Text>
          {matchingUsersCollection.docs.map(student => {
            // TODO: Test multiple students returning
            <StudentSearchResultItem
              student={student}
              key={student.data().schoolIssuedStudentId}
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
