import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import TeacherLoginStep from './TeacherLoginStep';
import RegisterScreen from './RegisterScreen';


// MAIN AUTH
type AuthStackParamList = {
  TeacherLoginStep: undefined;
  RegisterScreen: undefined;
};
// Main Auth Navigation Navigation Props
export type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'RegisterScreen'
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
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigation;
