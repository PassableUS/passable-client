import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SchoolDistrictStep from './SchoolDistrictStep';
import TeacherLoginStep from './TeacherLoginStep';

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

// MAIN AUTH
type AuthStackParamList = {
  SchoolDistrictStep: undefined;
  TeacherLoginStep: undefined;
};

// Main Auth Navigation Route Props
// export type CodeInputScreenRouteProp = RouteProp<AuthStackParamList, 'CodeInput'>;

// Main Auth Navigation Navigation Props
export type SchoolDistrictScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SchoolDistrictStep'
>;
export type TeacherLoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'TeacherLoginStep'
>;

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="TeacherLoginStep">
    {/* <Stack.Screen name="SchoolDistrictStep" component={SchoolDistrictStep} /> */}
    <Stack.Screen name="TeacherLoginStep" component={TeacherLoginStep} />
  </Stack.Navigator>
);

export default AuthNavigation;
