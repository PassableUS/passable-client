import React from 'react';
import { Text } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { StudentSearch } from './CreatePassScreen';
import { Student } from './StudentInfoScreen';
import { SearchScreenNavigationProp } from '../../navigation/HomeNavigation';

const SearchScreen = ({ navigation }: { navigation: SearchScreenNavigationProp }) => {
  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Hall Monitor
      </Text>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Search
      </Text>

      <StudentSearch
        handleStudentSelect={(student: Student) =>
          navigation.navigate('StudentInfo', { context: 'uid', uid: student.uid })
        }
      />
    </DefaultLayout>
  );
};

export default SearchScreen;
