import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  FlashyTabBarItemConfig,
  BubbleTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import HomeScreen from '../features/main/HomeScreen';
import { Platform } from 'react-native';
import ProfileScreen from '../features/main/ProfileScreen';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import CreatePassScreen from '../features/main/CreatePassScreen';
import { Button } from '@ui-kitten/components';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import StudentInfoScreen from '../features/main/StudentInfoScreen';
import SearchScreen from '../features/main/SearchScreen';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator();

let tabBarFunction: any = undefined;

if (Platform.OS !== 'web') {
  const AnimatedTabBar = require('@gorhom/animated-tabbar').default;

  const bubbleTabs: TabsConfig<BubbleTabBarItemConfig> = {
    Home: {
      labelStyle: {
        color: '#5B37B7',
      },
      icon: {
        component: HomeSVG,
        activeColor: 'rgba(91,55,183,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: 'rgba(223,215,243,1)',
        inactiveColor: 'rgba(223,215,243,0)',
      },
    },
    Search: {
      labelStyle: {
        color: '#E6A919',
      },
      icon: {
        component: SearchSVG,
        activeColor: 'rgba(230,169,25,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: 'rgba(230,169,25,0.25)',
        inactiveColor: 'rgba(207,235,239,0)',
      },
    },
    Profile: {
      labelStyle: {
        color: '#1194AA',
      },
      icon: {
        component: ProfileSVG,
        activeColor: 'rgba(17,148,170,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: 'rgba(207,235,239,1)',
        inactiveColor: 'rgba(207,235,239,0)',
      },
    },
  };

  tabBarFunction = (props: any) => <AnimatedTabBar preset="bubble" tabs={bubbleTabs} {...props} />;
}

// Start Home Screen Navigation
type HomeScreenStackParamList = {
  Home: undefined;
  CreatePass: { context: string };
  StudentInfo: {
    schoolIssuedId?: string;
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
export type StudentInfoScreenNavigationProp = StackNavigationProp<
  HomeScreenStackParamList,
  'StudentInfo'
>;

// Route prop types
export type CreatePassScreenRouteProp = RouteProp<HomeScreenStackParamList, 'CreatePass'>;
export type StudentInfoScreenRouteProp = RouteProp<HomeScreenStackParamList, 'StudentInfo'>;

const HomeScreenNavigation: React.FC = () => (
  <HomeScreenStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
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
    <HomeScreenStack.Screen
      name="StudentInfo"
      component={StudentInfoScreen}
      options={{
        cardStyle: { backgroundColor: 'rgba(0, 0, 0, 1)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    />
  </HomeScreenStack.Navigator>
);
// End Home Screen Navigation

export type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  StackNavigationProp<HomeScreenStackParamList>
>;

// TODO: Add SearchScreen to the navigation of the search tab screen

const HomeNavigation = () => {
  return (
    <Tab.Navigator tabBar={tabBarFunction} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        // initialParams={{
        //   backgroundColor: tabs.Home.labelStyle.color,
        //   nextScreen: 'Likes',
        // }}
        component={HomeScreenNavigation}
      />
      <Tab.Screen
        name="Search"
        // initialParams={{
        //   backgroundColor: tabs.Search.labelStyle.color,
        //   nextScreen: 'Profile',
        // }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Profile"
        // initialParams={{
        //   backgroundColor: tabs.Profile.labelStyle.color,
        //   nextScreen: 'Home',
        // }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
