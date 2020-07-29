import React from 'react';
import { Text, Button, Card } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { RootState } from '../../app/rootReducer';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { View } from 'react-native';

interface FirestorePassRepresenation {
  id: string;
  endTime: string;
  fromLocation: string;
  fromLocationName: string;
  issuingUserUid: string;
  passSchemaVersion: number;
  startTime: string;
  toLocation: string;
  toLocationName: string;
  type: string;
  passRecipientName: string;
  issuingUserName: string;
}

const HallPass = ({ passInformation }: { passInformation: FirestorePassRepresenation }) => {
  const [setPassTimeLeft, passTimeLeft] = React.useState();

  const Header = (props: any) => (
    <View {...props}>
      <Text category="h6">{passInformation.toLocationName}</Text>
      <Text category="s1">{JSON.stringify(passInformation.endTime)}</Text>
    </View>
  );

  return (
    <Card status="success" header={Header}>
      <Text>{passInformation.passRecipientName} </Text>
    </Card>
  );
};

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
        profileData.school.get().then((doc: firebase.firestore.DocumentSnapshot) => {
          unsubscribePasses = doc.ref
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
      <Text category="h1">Your Passes</Text>
      {userPasses &&
        userPasses.map((pass: FirestorePassRepresenation) => {
          return <HallPass key={pass.id} passInformation={pass} />;
        })}
      <Button onPress={() => auth.signOut()}>Sign out</Button>
    </DefaultLayout>
  );
};

export default HomeScreen;
