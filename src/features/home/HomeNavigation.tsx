import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CreatePassScreen from './screens/CreatePassScreen';

// Start Home Screen Navigation
export type HomeScreenStackParamList = {
  Home: undefined;
  CreatePass: { context: string };
  StudentInfo: {
    schoolIssuedStudentId?: string;
    name?: string;
    uid?: string;
    context: string;
    [contextResolved: string]: string;
  }; // Context resolved is just the route.params[INSERT_RANDOM_STRING] type
};
const HomeScreenStack = createStackNavigator<HomeScreenStackParamList>();

// Navigation prop types
export type HomeScreenNavigationProp = StackNavigationProp<HomeScreenStackParamList, 'Home'>;
export type CreatePassScreenNavigationProp = StackNavigationProp<
  HomeScreenStackParamList,
  'CreatePass'
>;

// Route prop types
export type CreatePassScreenRouteProp = RouteProp<HomeScreenStackParamList, 'CreatePass'>;

const HomeScreenNavigation: React.FC = () => (
  <HomeScreenStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
    initialRouteName="Home">
    <HomeScreenStack.Screen name="Home" component={HomeScreen} />
    <HomeScreenStack.Screen
      name="CreatePass"
      component={CreatePassScreen}
      options={{
        cardStyle: { backgroundColor: 'rgba(0, 0, 0, 1)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    />
  </HomeScreenStack.Navigator>
);
// End Home Screen Navigation

export default HomeScreenNavigation;
