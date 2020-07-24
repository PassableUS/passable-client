import {
  Text,
  View,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';

import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  WebViewScreenNavigationProp,
  WebViewScreenRouteProp,
} from '../../navigation/AuthNavigation';
import colors from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

interface IWebViewStepProps {
  navigation: WebViewScreenNavigationProp;
  route: WebViewScreenRouteProp;
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

const captchaUrl: string = 'https://nocap-captcha.now.sh/';

const WebViewStep: React.FC<IWebViewStepProps> = ({ route, navigation }: IWebViewStepProps) => {
  const { phoneNumber } = route.params;

  const onGetMessage = async (event: { nativeEvent: { data: any } }) => {
    const message = event.nativeEvent.data;
    console.log(message);
    switch (message) {
      case 'DOMLoaded':
        return;
      case 'ErrorSmsCode':
        // SMS Not sent or Captcha verification failed. You can do whatever you want here
        alert('There was an error sending your SMS code. Please try again.');
        // setStep('initial');
        return;
      case '':
        return;
      default: {
        navigation.goBack();
        navigation.navigate('CodeInput', { verificationId: message });
      }
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.contrastText, alignItems: 'center' }}>
      <Ionicons
        name="ios-close-circle"
        size={36}
        style={{
          position: 'absolute',
          right: 20,
          top: 15,
        }}
        color={colors.textColor}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        <Header
          style={{ flex: 1 }}
          emoji="robot_face"
          title="making sure ur not a robot"
          subtitle="please wait, u may have to solve a puzzle below so we can prove ur a human"
        />
        <View style={{ flex: 3, backgroundColor: 'transparent', marginBottom: 10 }}>
          <WebView
            style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
            injectedJavaScript={`getToken('${phoneNumber}')`}
            source={{ uri: captchaUrl }}
            onMessage={onGetMessage}
            scrollEnabled={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WebViewStep;
