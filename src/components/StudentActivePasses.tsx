import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import { Student, Pass } from '../features/main/StudentInfoScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import PassCard from './PassCard';

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

export default StudentActivePasses;
