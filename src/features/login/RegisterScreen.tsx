import React from 'react';
import { Text, Button, Spinner, Input } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { db, auth } from '../../app/AppAuthentication';
import FancyInput from '../../components/FancyInput';
import WavyHeader from '../../components/WavyHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { RegisterScreenNavigationProp } from './LoginNavigation';

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [schoolID, setSchoolID] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = () => {
    // Validation
    if (!password) {
      alert('Please enter your password');
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
    }

    setIsLoading(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          console.log('Successfully created user!');
        }
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMesage = err.message;

        alert(
          err.message +
            ' (Error Code: ' +
            errorCode +
            ') \n Please check your responses and try again.'
        );
        setIsLoading(false);
        return;
      });

    setIsLoading(false);
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
        customTop={300}
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
          style={{ width: 200, height: 50, marginTop: 100 }}
          source={require('../../assets/white-wordmark.png')}
        />

        <Text category="h1" style={{ marginTop: 30, color: 'white' }}>
          Get Started
        </Text>
        <Text category="s1" style={{ color: 'white' }}>
          Let's make your school safer.
        </Text>

        <Text category="s1" style={{ color: 'white', marginTop: 50, marginBottom: 5 }}>
          School Email
        </Text>
        <FancyInput
          style={{ marginBottom: 10 }}
          placeholder="Ex: chrism@flschool.k12.fl.us"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text category="s1" style={{ color: 'white', marginTop: 10, marginBottom: 5 }}>
          Password
        </Text>
        <FancyInput
          style={{ marginBottom: 10 }}
          placeholder="Enter in a password (9+ characters)"
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />

        <Text category="s1" style={{ color: 'white', marginTop: 10, marginBottom: 5 }}>
          Full Name (MOVE NAME AND SCHOOL ID TO NEXT SCREEN)
        </Text>
        <FancyInput
          style={{ marginBottom: 10 }}
          placeholder="Ex: John Smith"
          value={fullName}
          secureTextEntry
          onChangeText={text => setFullName(text)}
        />

        <Text category="s1" style={{ color: 'white', marginTop: 10, marginBottom: 5 }}>
          School ID (UNIQUE DEV ONLY, WILL BE MAPPED TO A LOCATION SOON)
        </Text>
        <FancyInput
          style={{ marginBottom: 10 }}
          placeholder="Ex: A1XT2547835"
          value={schoolID}
          secureTextEntry
          onChangeText={text => setSchoolID(text)}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <Text style={{ textAlign: 'center' }}>
            By pressing "Sign In", you agree to our Terms and that you have read our Data Use Policy
          </Text>

          {isLoading && <LoadingIndicator />}

          <PrimaryButton onPress={handleSignUp} text="Sign In" icon="login" iconType="AntDesign" />
        </View>
      </DefaultLayout>
    </>
  );
};

export default RegisterScreen;
