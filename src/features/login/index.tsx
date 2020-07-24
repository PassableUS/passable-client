import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInputStep from './PhoneInputStep';
import firebase from 'firebase';
import WebViewStep from './WebViewStep';
import CodeInputStep from './CodeInputStep';
import ProfileStep from './ProfileStep';
import colors from '../../theme/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
// import AnimatedLinearGradient, { presetColors } from '../../components/MovingLinearGradient';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import PictureSetup from './PictureSetup';
import SchoolStep from './SchoolStep';

// STYLING INFORMATION

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

const LoginScreen = (props: any) => {
  const { isFirebaseInitializedAndLoaded } = useSelector((state: RootState) => state.session);

  const [step, setStep] = useState<string>(
    isFirebaseInitializedAndLoaded ? 'getProfile' : 'initial'
  );
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [verificationId, setVerificationId] = useState<string>();

  const steps = [
    'initial',
    'phoneSubmitted',
    'promptSmsCode',
    'getProfile',
    'setProfilePicture',
    'setSchool',
  ];

  const nextStep = () => {
    let currentIndex = steps.indexOf(step);
    // If its the last step, do nothing
    if (currentIndex === steps.length - 1) {
      return;
    }
    setStep(steps[++currentIndex]);
  };

  const prevStep = () => {
    let currentIndex = steps.indexOf(step);
    // If its the first step, do nothing
    if (currentIndex === 0) {
      return;
    }
    setStep(steps[--currentIndex]);
  };

  return (
    // <AnimatedLinearGradient
    //   customColors={presetColors.instagram}
    //   speed={2500}
    //   style={styles.background}>
    <SafeAreaView style={{ backgroundColor: colors.contrastText, alignItems: 'center' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        {/* <TouchableOpacity onPress={prevStep}>
          <Text>Previous Step</Text>
        </TouchableOpacity> */}

        <FontAwesome.Button
          name="angle-left"
          size={32}
          color="black"
          backgroundColor="transparent"
          onPress={prevStep}
        />

        <TouchableOpacity onPress={nextStep}>
          <Text>Next</Text>
        </TouchableOpacity>

        {/* GET PHONE NUMBER STEP*/}
        {step === 'initial' && (
          <PhoneInputStep nextStep={nextStep} setPhoneNumber={setPhoneNumber} />
        )}

        {/* PHONE NUMBER ENTERED, REQUESTING FROM WEB PAGE */}
        {step === 'phoneSubmitted' && (
          <WebViewStep
            phoneNumber={phoneNumber}
            nextStep={nextStep}
            setStep={setStep}
            setVerificationId={setVerificationId}
          />
        )}

        {/* INPUT SMS CODE AND SIGN IN */}
        {step === 'promptSmsCode' && (
          <CodeInputStep verificationId={verificationId} nextStep={nextStep} />
        )}

        {/* TODO: Add check for sign in for these steps and beyond */}
        {step === 'getProfile' && <ProfileStep nextStep={nextStep} />}

        {step === 'setProfilePicture' && <PictureSetup nextStep={nextStep} />}

        {step === 'setSchool' && <SchoolStep nextStep={nextStep} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </AnimatedLinearGradient>
  );
};

export default LoginScreen;
