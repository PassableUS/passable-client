import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseAuthenticator';
import { Input, Spinner, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import StudentSearchResultItem from './StudentSearchResultItem';

const prepareNameSearch = (inputString: string) => {
  const removedSpacesString = inputString.replace(/\s/g, '');
  const lowercasedString = removedSpacesString.toLowerCase();
  return lowercasedString;
};

const FacultySearch = ({ handleStudentSelect }: { handleStudentSelect: Function }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

  const [searchText, setSearchText] = React.useState('');

  const fallbackText = prepareNameSearch(searchText) || 'placeholder';
  const [
    matchingUsersCollection,
    isMatchingUsersCollectionLoading,
    matchingUsersCollectionError,
  ] = useCollection(
    db
      .collection('users')
      // .where()

      .orderBy('searchName')
      .startAt(fallbackText)
      .endAt(fallbackText + '\uf8ff')
      .limit(5)
  );

  // TODO: Display any error

  return (
    <>
      <Input
        returnKeyType="done"
        placeholder="Search for a student"
        value={searchText}
        onChangeText={(nextValue: string) => setSearchText(nextValue)}
      />

      {isMatchingUsersCollectionLoading && <Spinner />}

      {matchingUsersCollection?.docs.length === 0 && searchText !== '' ? (
        <Text category="s1" style={{ marginTop: 10 }}>
          No results found. Please check the spelling of the student's name.
        </Text>
      ) : (
        undefined
      )}

      {matchingUsersCollection && (
        <ScrollView>
          {matchingUsersCollection.docs.map(snap => {
            return (
              <StudentSearchResultItem
                student={{ ref: snap.ref, uid: snap.id, ...snap.data() }}
                key={snap.id}
                handleStudentSelect={handleStudentSelect}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};
export default StudentSearch;
