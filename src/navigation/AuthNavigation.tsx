import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LoginScreen from '../features/login';
import PhoneInputStep from '../features/login/PhoneInputStep';
import CodeInputStep from '../features/login/CodeInputStep';
import WebViewStep from '../features/login/WebViewStep';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import ProfileStep from '../features/login/ProfileStep';
import { Ionicons } from '@expo/vector-icons';
import SchoolStep from '../features/login/SchoolStep';
import PictureSetup from '../features/login/PictureSetup';
import SchoolDistrictStep from '../features/login/SchoolDistrictStep';

// PHONE INPUT / CAPTCHA
type PhoneInputStackParamList = {
  Phone: undefined;
  WebView: { phoneNumber: string };
};
export type PhoneScreenNavigationProp = StackNavigationProp<PhoneInputStackParamList, 'Phone'>;
export type WebViewScreenRouteProp = RouteProp<PhoneInputStackParamList, 'WebView'>;
// Use composite here as the web view screen can navigate outside of the phone stack into other auth screens
export type WebViewScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoneInputStackParamList, 'WebView'>,
  StackNavigationProp<AuthStackParamList>
>;
const PhoneInputStack = createStackNavigator<PhoneInputStackParamList>();
const PhoneInputNavigation: React.FC = () => (
  <PhoneInputStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Phone">
    <PhoneInputStack.Screen name="Phone" component={PhoneInputStep} />
    <PhoneInputStack.Screen
      name="WebView"
      component={WebViewStep}
      options={{
        cardStyle: { backgroundColor: 'rgba(0, 0, 0, 1)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    />
  </PhoneInputStack.Navigator>
);

// MAIN AUTH
type AuthStackParamList = {
  SchoolDistrictStep: undefined;
  Login: undefined;
  PhoneStack: undefined;
  CodeInput: {
    verificationId: string;
  };
  ProfileSetup: undefined;
  SchoolSetup: undefined;
  PictureSetup: undefined;
};

// Main Auth Navigation Route Props
export type CodeInputScreenRouteProp = RouteProp<AuthStackParamList, 'CodeInput'>;

// Main Auth Navigation Navigation Props
export type CodeInputScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'CodeInput'>;
export type ProfileSetupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ProfileSetup'
>;
export type SchoolSetupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SchoolSetup'
>;

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login">
    <Stack.Screen name="SchoolDistrictStep" component={SchoolDistrictStep} />
    <Stack.Screen name="PhoneStack" component={PhoneInputNavigation} />
    <Stack.Screen name="CodeInput" component={CodeInputStep} />
    <Stack.Screen name="ProfileSetup" component={ProfileStep} />
    <Stack.Screen name="SchoolSetup" component={SchoolStep} />
    <Stack.Screen name="PictureSetup" component={PictureSetup} />
  </Stack.Navigator>
);

export default AuthNavigation;
