import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentAttendanceKioskScreen from './screens/StudentAttendanceKioskScreen';

export type KioskNavigationStackParamList = {
  StudentAttendanceKiosk: undefined;
};
const KioskNavigationStack = createStackNavigator<KioskNavigationStackParamList>();

const KioskNavigation: React.FC = () => (
  <KioskNavigationStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
    initialRouteName="StudentAttendanceKiosk">
    <KioskNavigationStack.Screen
      name="StudentAttendanceKiosk"
      component={StudentAttendanceKioskScreen}
    />
  </KioskNavigationStack.Navigator>
);
// End Home Screen Navigation

export default KioskNavigation;
