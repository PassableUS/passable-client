import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import { auth, db } from '../../../app/AppAuthentication';
import { RootState } from '../../../app/rootReducer';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { View, Image } from 'react-native';
import MovingLinearGradient, { presetColors } from '../../../components/MovingLinearGradient';
import MovingGradientButton from '../../../components/MovingGradientButton';
import PassList from '../../../components/PassList';
import { HomeScreenNavigationProp } from '../HomeNavigation';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LargeActivePass from '../../../components/LargeActivePass';
import { Pass } from '../../../types/school';
import StudentLargePassList from '../../../components/StudentLargePassList';
import PassApprovalList from '../../../components/PassApprovalList';
import DefaultLayout from '../../../components/layouts/DefaultLayout';
import { gql, useSubscription } from '@apollo/client';
import { useQuery } from '@apollo/client';

const GET_SCHOOLS = gql`
  subscription MyQuery {
    schools {
      name
    }
  }
`;

const PassListQuery = () => {
  const { loading, error, data } = useSubscription(GET_SCHOOLS);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.error(error);
    return <Text>Error! {JSON.stringify(error)}</Text>;
  }
  return <Text>{JSON.stringify(data)}</Text>;
};

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [currentTime, _] = React.useState(new Date());
  const isTeacher = false;

  return (
    <>
      <DefaultLayout scrollable>
        <PassListQuery />
        <Image style={{ height: 100, width: 100 }} source={require('../../../assets/icon.png')} />

        {/* {role === 'student' && studentPath && <StudentLargePassList studentPath={studentPath} />} */}

        <Text category="h1" style={{ marginTop: 30, paddingBottom: 10 }}>
          Create Passes
        </Text>

        <View style={{ flexDirection: 'row', display: 'flex' }}>
          <MovingGradientButton
            buttonHeight={125}
            speed={1700}
            customColors={presetColors.greenish}
            style={{ margin: 5 }}
            buttonText="Create"
            onButtonPress={() => navigation.navigate('CreatePass', { context: 'search' })}
          />
        </View>

        {/* TODO: Hide active passes and show only scheduled passes if student */}
        <Text category="h1" style={{ marginTop: 30, paddingBottom: 10 }}>
          Active Passes
        </Text>

        <>
          <PassList passesData={[]} />
        </>

        {isTeacher && (
          <>
            <Text category="h1" style={{ marginTop: 30, paddingBottom: 10 }}>
              Pass Requests
            </Text>

            <PassApprovalList />
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default HomeScreen;
