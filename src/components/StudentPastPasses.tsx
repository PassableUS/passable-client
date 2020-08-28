import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import { Student, Pass } from '../features/main/StudentInfoScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import PassCard from './PassCard';
import PassList from './PassList';

const StudentPastPasses = ({ student }: { student: Student }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const [cachedTime, setCachedTime] = React.useState(new Date());

  const [
    pastPassesCollection,
    isPastPassesCollectionLoading,
    pastPassesCollectionError,
  ] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('students')
      .doc(student.uid)
      .collection('passes')
      .orderBy('endTime', 'desc')
      .limit(10),
    { idField: 'uid' }
  );

  if (isPastPassesCollectionLoading) return <Spinner />;

  return (
    <>
      {pastPassesCollectionError && <Text>{pastPassesCollectionError.message}</Text>}
      {pastPassesCollection && pastPassesCollection.length > 0 ? (
        <PassList passesData={pastPassesCollection} displayTeacher displayDateInsteadOfTime />
      ) : (
        <Text category="s1">No past passes found.</Text>
      )}
    </>
  );
};

export default StudentPastPasses;