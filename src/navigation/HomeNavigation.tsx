import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const FlashyScreen = () => {
  return (
    <Tab.Navigator tabBar={tabBarFunction} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        // initialParams={{
        //   backgroundColor: tabs.Home.labelStyle.color,
        //   nextScreen: 'Likes',
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
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyScreen;
