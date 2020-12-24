import React from 'react';
import { Platform, View } from 'react-native';
import { TabsConfig, BubbleTabBarItemConfig } from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import HallManagementNavigation from '../features/hallMonitor/HallMonitorNavigation';
import RoomSVG from '../svg/RoomSVG';
import RoomScreen from '../features/rooms';
import HomeScreenNavigation from '../features/home/HomeNavigation';
import ProfileScreen from '../features/profile';

export let tabBarFunction: any = undefined;
export let studentTabBarFunction: any = undefined;

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
    'Hall Monitor': {
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
    Rooms: {
      labelStyle: {
        color: '#5B37B7',
      },
      icon: {
        component: RoomSVG,
        activeColor: 'rgba(91,55,183,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: 'rgba(223,215,243,1)',
        inactiveColor: 'rgba(223,215,243,0)',
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

  const studentBubbleTaps: TabsConfig<BubbleTabBarItemConfig> = {
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
  studentTabBarFunction = (props: any) => (
    <AnimatedTabBar preset="bubble" tabs={studentBubbleTaps} {...props} />
  );
}

export let getCoreScreens = (role: string) => {
  const coreScreens = [
    {
      permission: 'all',
      name: 'Home',
      component: HomeScreenNavigation,
      icon: () => <HomeSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'teacher',
      name: 'Hall Monitor',
      component: HallManagementNavigation,
      icon: () => <SearchSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'teacher',

      name: 'Rooms',
      component: RoomScreen,
      icon: () => <RoomSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'all',

      name: 'Profile',
      component: ProfileScreen,
      icon: () => <ProfileSVG color={'black' as any} size={20} />,
    },
  ];

  // TODO: Filter based on roles
  const filteredScreens = coreScreens;

  return filteredScreens;
};
