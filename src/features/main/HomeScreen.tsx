import React from 'react';
import { Text, Button, Card } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../components/FirebaseAuthenticator';
import { RootState } from '../../app/rootReducer';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { HomeScreenNavigationProp } from '../../navigation/HomeNavigation';
import PassCard from '../../components/PassCard';
import { Pass } from './StudentInfoScreen';
import MovingLinearGradient, { presetColors } from '../../components/MovingLinearGradient';
import MovingGradientButton from '../../components/MovingGradientButton';

// const HallPass = ({ passInformation }: { passInformation: FirestorePassRepresenation }) => {
//   const [setPassTimeLeft, passTimeLeft] = React.useState();

//   const Header = (props: any) => (
//     <View {...props}>
//       <Text category="h6">{passInformation.toLocationName}</Text>
//       <Text category="s1">{passInformation.endTime.seconds}</Text>
//     </View>
//   );

//   return (
//     <Card status="success" header={Header}>
//       <Text>{passInformation.passRecipientName} </Text>
//     </Card>
//   );
// };

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const userUid = useSelector((state: RootState) => state.setup.userUid);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const [userPasses, setUserPasses] = React.useState<firebase.firestore.DocumentData[]>();

  React.useEffect(() => {
    console.log('Fetching Firebase Data: User -> School -> User Passes');
    let unsubscribePasses: any = () =>
      console.log('HomeScreen component unmounted Before unsubscribePasses could be set');
    const unsubscribe = db
      .collection('users')
      .doc(userUid)
      .onSnapshot(doc => {
        const profileData = doc.data();
        profileData.school.get().then((doc: firebase.firestore.DocumentSnapshot) => {
          unsubscribePasses = doc.ref
            .collection('passes')
            // TODO: Change this reference to user document when possible
            .where('issuingUser', '==', db.collection('users').doc(userUid))
            .where('endTime', '>=', currentTime)
            .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
              setUserPasses(
                querySnapshot.docs.map(doc => {
                  return { uid: doc.id, ...doc.data() };
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
    <DefaultLayout scrollable>
      <Text category="h1" style={{ marginTop: 25, paddingBottom: 10 }}>
        Create Passes
      </Text>

      <View style={{ flexDirection: 'row', display: 'flex' }}>
        <MovingGradientButton
          speed={1700}
          buttonText="Create"
          onButtonPress={() => navigation.navigate('CreatePass', { context: 'search' })}
        />
        <MovingGradientButton
          customColors={presetColors.blueish}
          speed={3000}
          style={{ marginLeft: 10 }}
          buttonText="Scan"
          onButtonPress={() => navigation.navigate('CreatePass', { context: 'scan' })}
        />

        {/* <Button
          onPress={() => navigation.navigate('CreatePass', { context: 'scan' })}
          style={{ flex: 1, height: 100 }}>
          Scan
        </Button>
        <Button
          
          style={{ marginLeft: 5, flex: 1, height: 100 }}>
          Create Pass
        </Button> */}
      </View>

      <Text category="h1" style={{ marginTop: 25, paddingBottom: 10 }}>
        Active Passes
      </Text>
      {userPasses &&
        userPasses.map((pass: Pass) => {
          return <PassCard key={pass.uid} passInfo={{ passColor: '#F6C', ...pass }} />;
        })}
    </DefaultLayout>
  );
};

export default HomeScreen;
