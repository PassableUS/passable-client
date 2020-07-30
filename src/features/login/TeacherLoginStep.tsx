import React from 'react';
import {
  Layout,
  Text,
  Autocomplete,
  AutocompleteItem,
  Button,
  Icon,
  Spinner,
  Input,
} from '@ui-kitten/components';
import { KeyboardAvoidingView, Platform, FlatList, View, Alert } from 'react-native';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { db, auth } from '../../components/FirebaseAuthenticator';
import LottieView from 'lottie-react-native';
import { District, setupDistrict } from './setupSlice';
import { useDispatch } from 'react-redux';
import {
  SchoolDistrictScreenNavigationProp,
  TeacherLoginScreenNavigationProp,
} from '../../navigation/AuthNavigation';

interface TeacherLoginStepProps {
  navigation: TeacherLoginScreenNavigationProp;
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const TeacherLoginStep = ({ navigation }: TeacherLoginStepProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = () => {
    // Validation
    if (!password) {
      alert('Please enter your password');
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
    }

    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user) {
          alert('Signed in!');
        }
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMesage = err.message;

        alert(
          err.message +
            ' (Error Code: ' +
            errorCode +
            ') \n Please check your credentials and try again.'
        );
        setIsLoading(false);
        return;
      });

    setIsLoading(false);

    // dispatch(setupDistrict(district));
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
    <DefaultLayout>
      <Text category="h1" style={{ marginTop: 30 }}>
        Login
      </Text>
      <Text category="s1">Enter the email and password as provided by your school district.</Text>

      <Input
        size="large"
        style={{ width: '100%', marginTop: 50, marginBottom: 10 }}
        placeholder="Email Address"
        caption="Enter the email that you were provided to sign in with. This may be your district email address."
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        size="large"
        style={{ width: '100%', marginBottom: 20 }}
        placeholder="Password"
        caption="Enter the password that you were provided or previously set."
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          By pressing "Next", you agree to our Terms and that you have read our Data Use Policy
        </Text>
        <Button
          accessoryLeft={isLoading ? LoadingIndicator : null}
          appearance={isLoading ? 'outline' : 'primary'}
          onPress={handleNext}
          size="giant">
          Sign In
        </Button>
      </View>
    </DefaultLayout>
  );
};

export default TeacherLoginStep;
