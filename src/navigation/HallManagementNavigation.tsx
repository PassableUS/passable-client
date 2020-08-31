import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainHomeParamList } from './HomeNavigation';
import {
  StackNavigationProp,
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SearchScreen from '../features/main/SearchScreen';
import StudentInfoScreen from '../features/main/StudentInfoScreen';
import { HomeScreenStackParamList } from './HomeScreenNavigation';

// **************************
// Hall Management Navigation
// **************************
export type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainHomeParamList>,
  StackNavigationProp<HomeScreenStackParamList>
>;

type HallManagementStackParamList = {
  Search: undefined;
  StudentInfo: {
    schoolIssuedStudentId?: string;
    name?: string;
    uid?: string;
    context: string;
    [contextResolved: string]: string;
  }; // Context resolved is just the route.params[INSERT_RANDOM_STRING] type
};
const HallManagementStack = createStackNavigator<HallManagementStackParamList>();

// Navigation prop types
export type StudentInfoScreenNavigationProp = StackNavigationProp<
  HomeScreenStackParamList,
  'StudentInfo'
>;

// Route prop types
export type StudentInfoScreenRouteProp = RouteProp<HomeScreenStackParamList, 'StudentInfo'>;

const HallManagementNavigation: React.FC = () => (
  <HallManagementStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
    initialRouteName="Search">
    <HallManagementStack.Screen name="Search" component={SearchScreen} />
    <HallManagementStack.Screen
      name="StudentInfo"
      component={StudentInfoScreen}
      options={{
        cardStyle: { backgroundColor: 'rgba(0, 0, 0, 1)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    />
  </HallManagementStack.Navigator>
);

// **************************
// End Hall Management Navigation
// **************************

export default HallManagementNavigation;
