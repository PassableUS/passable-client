import React from 'react';
import { Text, Button, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { StudentInfoScreenRouteProp } from '../../navigation/HomeNavigation';

export interface Pass {
  fromLocation: string;
}
export interface Student {
  eventsLog: Pass[];
  firstName: string;
  grade: string;
  lastName: string;
  schoolIssuedStudentId: string;
}

const StudentInfoScreen = ({ route }: { route: StudentInfoScreenRouteProp }) => {
  const [user, isAuthLoading, authError] = useAuthState(auth);
  const [schoolData, setSchoolData] = React.useState<firebase.firestore.DocumentData>();
  const [userData, setUserData] = React.useState<firebase.firestore.DocumentData>();

  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const [
    matchingUsersCollection,
    isMatchingUsersCollectionLoading,
    matchingUsersCollectionError,
  ] = useCollectionData<Student>(db.doc(schoolPath).collection('students'));

  if (!route.params.id && !route.params.name)
    return (
      <DefaultLayout>
        <Text category="h1">
          No student search data found. This may be an error. Please return to the previous screen.
        </Text>
      </DefaultLayout>
    );

  if (isMatchingUsersCollectionLoading || !matchingUsersCollection)
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );

  const SingleStudentDisplay = ({ student }: { student: Student }) => {
    const getNumberWithOrdinal = (n: string) => {
      var s = ['th', 'st', 'nd', 'rd'],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
      <>
        <Text category="h1">
          {student.firstName} {student.lastName}
        </Text>
        <Text category="h4">{getNumberWithOrdinal(student.grade)} Grade</Text>
      </>
    );
  };

  return (
    <DefaultLayout>
      {matchingUsersCollection.length === 1 ? (
        <SingleStudentDisplay student={matchingUsersCollection[0]} />
      ) : (
        // TODO: Implement the selection of more than one document
        <Text>More than 1 document</Text>
      )}
    </DefaultLayout>
  );
};

export default StudentInfoScreen;
