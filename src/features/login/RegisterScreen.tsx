import React from 'react';
import { Text, Button, Spinner, Input } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { db, auth } from '../../app/AppAuthentication';
import FancyInput from '../../components/FancyInput';
import WavyHeader from '../../components/WavyHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { RegisterScreenNavigationProp } from './LoginNavigation';
import GooglePlacesInput from '../../components/GooglePlacesInput';
import { gql, useMutation } from '@apollo/client';

const ADD_SCHOOL_AND_REGISTER_USER = gql`
  mutation CreateSchoolAndAdmin(
    $schoolPlaceID: String!
    $schoolName: String!
    $password: String!
    $lastName: String!
    $firstName: String!
    $email: String!
  ) {
    createSchool(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      schoolPlaceID: $schoolPlaceID
      schoolName: $schoolName
    ) {
      userUid
    }
  }
`;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [schoolPlaceID, setSchoolPlaceID] = React.useState('');
  const [schoolName, setSchoolName] = React.useState('');

  // Mutation for creating school
  const [
    addSchoolAndRegisterAdminUser,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_SCHOOL_AND_REGISTER_USER);

  const handleSignUp = () => {
    // Validation
    if (!password) {
      alert('Please enter your password');
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
    }

    addSchoolAndRegisterAdminUser({
      variables: { email, firstName, lastName, password, schoolName, schoolPlaceID },
    });
  };

  const LoadingIndicator = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner size="small" />
    </View>
  );

  return (
    <>
      <WavyHeader
        customStyles={{ position: 'absolute', width: '100%' }}
        customHeight={550}
        customTop={340}
        customBgColor="#2253ff"
        customWavePattern="M0,96L48,112C96,128,192,160,288,
        186.7C384,213,480,235,576,213.3C672,192,768,128,864,
        128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
        176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
        0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
        0,96,0,48,0L0,0Z"
      />

      <DefaultLayout backgroundColor="transparent">
        <Image
          style={{ width: 200, height: 50, marginTop: 50 }}
          source={require('../../assets/white-wordmark.png')}
        />
        <View
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'white',
            padding: 50,
            marginVertical: 50,
            width: '100%',
            borderRadius: 20,
          }}>
          <Text category="h1">Get Started</Text>
          <Text category="s1">Let's make your school safer.</Text>

          <Text category="s1" style={{ marginTop: 50, marginBottom: 5 }}>
            School Email
          </Text>
          <FancyInput
            style={{ marginBottom: 10 }}
            placeholder="Ex: chrism@flschool.k12.fl.us"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Text category="s1" style={{ marginTop: 10, marginBottom: 5 }}>
            Password
          </Text>
          <FancyInput
            style={{ marginBottom: 10 }}
            placeholder="Enter in a password (9+ characters)"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />

          <Text category="s1" style={{ marginTop: 10, marginBottom: 5 }}>
            Full Name
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FancyInput
              style={{ marginBottom: 10, flex: 1 }}
              placeholder="First Name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <FancyInput
              style={{ marginBottom: 10, marginLeft: 10, flex: 1 }}
              placeholder="Last Name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>

          <View style={{ minHeight: 180 }}>
            <Text category="s1" style={{ marginTop: 10, marginBottom: 5 }}>
              Pick your school
            </Text>
            <GooglePlacesInput
              onPress={(item: any) => {
                setSchoolName(item?.structured_formatting?.main_text || item?.description);
                setSchoolPlaceID(item?.place_id);
              }}
              placeholder="Search for your school"
            />
            <Text>School Full Name: {schoolName || 'School Not Yet Selected'}</Text>
            <Text>School Place ID: {schoolPlaceID || 'School Not Yet Selected'}</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <Text style={{ textAlign: 'center' }}>
            By pressing "Sign In", you agree to our Terms and that you have read our Data Use Policy
          </Text>

          {mutationLoading && <LoadingIndicator />}
          {mutationError && (
            <Text category="h4" style={{ color: 'red' }}>
              {mutationError.name}: {mutationError.message}
            </Text>
          )}

          <PrimaryButton onPress={handleSignUp} text="Sign Up" icon="login" iconType="AntDesign" />
        </View>
      </DefaultLayout>
    </>
  );
};

export default RegisterScreen;
