import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../app/AppAuthentication';
import PassCard from './PassCard';
import PassList from './PassList';
import { Student, Pass } from '../types/school';

const StudentPastPasses = ({ student }: { student: firebase.firestore.DocumentSnapshot }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const [
    pastPassesCollection,
    isPastPassesCollectionLoading,
    pastPassesCollectionError,
  ] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('students')
      .doc(student.id)
      .collection('passes')
      .orderBy('endTime', 'desc')
      .limit(12),
    { idField: 'uid' }
  );

  if (isPastPassesCollectionLoading) return <Spinner />;

  return (
    <>
      {pastPassesCollectionError && <Text>{pastPassesCollectionError.message}</Text>}
      {pastPassesCollection && pastPassesCollection.length > 0 ? (
        <PassList passesData={pastPassesCollection} displayIssuer displayDateInsteadOfTime />
      ) : (
        <Text category="s1">No past passes found.</Text>
      )}
    </>
  );
};

export default StudentPastPasses;
