import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfig, FlashyTabBarItemConfig } from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import HomeScreen from '../features/main/HomeScreen';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

let tabBarFunction: any = undefined;

if (Platform.OS !== 'web') {
  const AnimatedTabBar = require('@gorhom/animated-tabbar').default;
  alert('Test');
  const tabs: TabsConfig<FlashyTabBarItemConfig> = {
    Home: {
      labelStyle: {
        color: '#5B37B7',
      },
      icon: {
        component: HomeSVG,
        color: 'rgba(91,55,183,0.5)',
      },
    },
    Likes: {
      labelStyle: {
        color: '#C9379D',
      },
      icon: {
        component: LikeSVG,
        color: 'rgba(201,55,157,0.5)',
      },
    },
    Search: {
      labelStyle: {
        color: '#E6A919',
      },
      icon: {
        component: SearchSVG,
        color: 'rgba(230,169,25,0.5)',
      },
    },
    Profile: {
      labelStyle: {
        color: '#1194AA',
      },
      icon: {
        component: ProfileSVG,
        color: 'rgba(17,148,170,0.5)',
      },
    },
  };

  tabBarFunction = (props: any) => <AnimatedTabBar preset="flashy" tabs={tabs} {...props} />;
}

const FlashyScreen = () => {
  return (
    <Tab.Navigator tabBar={tabBarFunction}>
      <Tab.Screen
        name="Home"
        // initialParams={{
        //   backgroundColor: tabs.Home.labelStyle.color,
        //   nextScreen: 'Likes',
        // }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Likes"
        // initialParams={{
        //   backgroundColor: tabs.Likes.labelStyle.color,
        //   nextScreen: 'Search',
        // }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Search"
        // initialParams={{
        //   backgroundColor: tabs.Search.labelStyle.color,
        //   nextScreen: 'Profile',
        // }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        // initialParams={{
        //   backgroundColor: tabs.Profile.labelStyle.color,
        //   nextScreen: 'Home',
        // }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyScreen;
