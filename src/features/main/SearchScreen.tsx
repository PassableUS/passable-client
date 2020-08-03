import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { StudentSearch } from './CreatePassScreen';
import { Student, Pass } from './StudentInfoScreen';
import { SearchScreenNavigationProp } from '../../navigation/HomeNavigation';
import { db } from '../../components/FirebaseAuthenticator';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { useCollectionData } from 'react-firebase-hooks/firestore/';
import PassList from '../../components/PassList';

const SearchScreen = ({ navigation }: { navigation: SearchScreenNavigationProp }) => {
  const [userPasses, setUserPasses] = React.useState<firebase.firestore.DocumentData[]>();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const [activePasses, activePassesLoading, activePassesError] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('passes')
      .where('endTime', '>=', currentTime)
      .limit(15),
    { idField: 'uid' }
  );

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Search
      </Text>

      <StudentSearch
        handleStudentSelect={
          (student: Student) => alert('Searched')
          // navigation.navigate('StudentInfo', { context: 'uid', uid: student.uid })
        }
      />
      <Text category="h1" style={{ marginBottom: 20 }}>
        Hall Monitor
      </Text>

      {activePasses && (
        <>
          <PassList passesData={activePasses} destructSelf />
        </>
      )}
      {activePassesError && <Text category="h2">{activePassesError.message}</Text>}
      {activePassesLoading && <Spinner />}
    </DefaultLayout>
  );
};

export default SearchScreen;
