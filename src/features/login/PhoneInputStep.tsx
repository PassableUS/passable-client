import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Platform,
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { normalizePhoneNumber, formatPhoneNumber } from '../../utils/formatPhoneNumber';
import FancyButton from '../../components/FancyButton';
import FancyInput from '../../components/FancyInput';
import Header from '../../components/Header';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import Emoji from 'react-native-emoji';
import colors from '../../theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { PhoneScreenNavigationProp } from '../../navigation/AuthNavigation';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';

interface PhoneInputStepProps {
  navigation: PhoneScreenNavigationProp;
}

const PhoneInputStep: React.FC<PhoneInputStepProps> = ({ navigation }: PhoneInputStepProps) => {
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const handlePhoneInput = (phoneNumber: string) => {
    setPhoneNumber(normalizePhoneNumber(phoneNumber));
    setDisplayPhoneNumber(formatPhoneNumber(phoneNumber));
  };

  const onPhoneNumberSubmit = async () => {
    if (!phoneNumber) return alert('Please enter a phone number.');
    if (phoneNumber.length !== 12) return alert('Please enter a valid phone number.');

    setLoading(true);
    navigation.navigate('WebView', { phoneNumber });
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  // Resets navigation so you can't swipe back to the loading screen
  // useEffect(
  //   () =>
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'PhoneStack' }],
  //     }),
  //   []
  // );

  const debugNavigation = (): null => {
    Alert.prompt(
      'DEBUG ONLY TOOL: Navigate',
      'If you are a regular user and stumbled upon this tool. Please press cancel',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (navScreen: any) => navigation.navigate(navScreen),
        },
      ]
    );
    return null;
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
        <TouchableHighlight onPress={debugNavigation}>
          <Text>Debug Navigation</Text>
        </TouchableHighlight>

        <Header
          emoji="phone"
          title="what's ur number?"
          subtitle="we'll text u a code so we can make sure ur not a robot"
        />

        <View style={{ marginVertical: spacing.inputSpacing }}>
          <FancyInput
            label="phone number"
            placeholder="enter your phone number here"
            value={displayPhoneNumber}
            onChangeText={phoneNumber => handlePhoneInput(phoneNumber)}
            maxLength={14}
            keyboardType={'numeric'}
            returnKeyType={'done'}
          />
        </View>

        {/* <Text style={typography.paragraphText}>
        never sign up using someone else's number. u won't be able to sign in, and u will probably
        annoy that person.
      </Text> */}

        <View
          style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, alignItems: 'center' }}>
          <Text style={[{ textAlign: 'center' }, typography.smallExplainerText]}>
            Semrai, LLC is reponsible for the processing and collection of your personal data, upon
            which you have the rights to. By signing up you agree to our{' '}
            <Text onPress={() => alert('presses')} style={{ fontWeight: 'bold' }}>
              Privacy Policy
            </Text>{' '}
            and <Text style={{ fontWeight: 'bold' }}>Terms of Service</Text>
          </Text>
          <FancyButton text="next" loading={loading} onPress={onPhoneNumberSubmit} />
        </View>

        {/* <TextInput value={phoneNumber} onChangeText={phoneNumber => handlePhoneInput(phoneNumber)} /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneInputStep;
