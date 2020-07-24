import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';

import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import typography from '../../theme/typography';
import FancyInput from '../../components/FancyInput';
import FancyButton from '../../components/FancyButton';
import Header from '../../components/Header';
import spacing from '../../theme/spacing';
import firebase from 'firebase';
import {
  CodeInputScreenNavigationProp,
  CodeInputScreenRouteProp,
} from '../../navigation/AuthNavigation';
import colors from '../../theme/colors';
import BackButton from '../../components/BackButton';
interface CodeInputStepProps {
  nextStep: any;
  verificationId: string;
  navigation: CodeInputScreenNavigationProp;
  route: CodeInputScreenRouteProp;
}

const CodeInputStep: React.FC<CodeInputStepProps> = ({ navigation, route }: CodeInputStepProps) => {
  const [smsCode, setSmsCode] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { verificationId } = route.params;

  const onSignIn = async () => {
    // Input validation
    if (!smsCode) return alert('Please enter a code.');
    if (smsCode.length !== 6)
      return alert('Please enter a valid code. The code should be 6 digits long.');

    // Attempt authentication
    try {
      setIsLoading(true);
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => setIsLoading(false))
        .then(() => navigation.navigate('ProfileSetup'))
        .catch(() => {
          alert('Something went wrong. The code may be invalid or expired.');
          setIsLoading(false);
        });
    } catch (e) {
      alert('Something went wrong.' + JSON.stringify(e));
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.contrastText, alignItems: 'center' }}>
      <KeyboardAvoidingView
        style={{
          width: '80%',
          height: '100%',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        <BackButton />
        <Header
          emoji="white_check_mark"
          title="enter that code"
          subtitle="you'll receive a text with a code in a few seconds."
        />

        <FancyInput
          label="code"
          autoFocus
          placeholder="enter your code here"
          value={smsCode}
          onChangeText={sms => setSmsCode(sms)}
          keyboardType="numeric"
          returnKeyType={'done'}
          maxLength={6}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <FancyButton loading={isLoading} onPress={onSignIn} text="verify" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CodeInputStep;
