import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import PassCard from './PassCard';
import PassList from './PassList';
import { Student, Pass } from '../types/school';

const StudentActivePasses = ({
  student,
  displayIssuer,
}: {
  student: Student;
  displayIssuer?: boolean;
}) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const studentPath = useSelector(
    (state: RootState) => state.setup.studentInformation.documentPath
  );
  const [cachedTime, setCachedTime] = React.useState(new Date());
  const currentTimeAndDate = new Date();

  const [
    activePassesCollection,
    isActivePassesCollectionLoading,
    activePassesCollectionError,
  ] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('passes')
      .where('passRecipientUser', '==', db.doc(studentPath))
      .where('endTime', '>=', cachedTime)
      .limit(5),
    { idField: 'uid' }
  );

  if (isActivePassesCollectionLoading) return <Spinner />;

  return (
    <>
      {activePassesCollectionError && <Text>{activePassesCollectionError.message}</Text>}
      {activePassesCollection && activePassesCollection.length > 0 ? (
        <PassList passesData={activePassesCollection} displayIssuer />
      ) : (
        <Text category="s1">No active passes found.</Text>
      )}
    </>
  );
};

export default StudentActivePasses;
