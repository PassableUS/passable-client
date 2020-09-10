import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Pass } from '../types/school';
import { db } from './FirebaseAuthenticator';
import LargeActivePass from './LargeActivePass';

const StudentLargePassList: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const studentPath = useSelector(
    (state: RootState) => state.setup.studentInformation.documentPath
  );

  if (!studentPath) return null;

  const [
    studentLargePasses,
    isLoadingStudentLargePasses,
    studentLargePassesError,
  ] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('passes')
      .where('passRecipientUser', '==', db.doc(studentPath))
      .where('endTime', '>=', currentTime),

    { idField: 'uid' }
  );

  return (
    <>
      {studentLargePasses &&
        studentLargePasses.map(pass => <LargeActivePass key={pass.uid} passInfo={pass} />)}
    </>
  );
};

export default StudentLargePassList;
