import React from 'react';
import { Text, Button } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { RootState } from '../../app/rootReducer';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const userUid = useSelector((state: RootState) => state.setup.userUid);

  const [userPasses, setUserPasses] = React.useState<firebase.firestore.DocumentData[]>();

  React.useEffect(() => {
    console.log('Fetching Firebase Data: User -> School -> User Passes');
    let unsubscribePasses: any;
    const unsubscribe = db
      .collection('users')
      .doc(userUid)
      .onSnapshot(doc => {
        const profileData = doc.data();
        unsubscribePasses = profileData.school
          .get()
          .then((doc: firebase.firestore.DocumentSnapshot) => {
            doc.ref
              .collection('passes')
              .where('issuingUserUid', '==', userUid)
              .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
                setUserPasses(
                  querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() };
                  })
                );
                console.log('Fetching more passes...');
              });
          });
      });

    return () => {
      unsubscribe();
      unsubscribePasses();
    };
  }, []);

  return (
    <DefaultLayout>
      {userPasses &&
        userPasses.map(pass => {
          return <Text key={pass.id}>{pass.toLocationName}</Text>;
        })}
      <Text category="h1">{userUid}</Text>
      <Text category="h1">Your Passes</Text>
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default HomeScreen;
