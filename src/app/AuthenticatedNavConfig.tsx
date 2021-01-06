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
import Accounts from '../features/accounts';

export const getTabBarFunction = (userPermissions: string[]) => {
  if (!userPermissions || userPermissions.length == 0) userPermissions = ['base_permissions']; // Fall back to base permissions if we don't have any permissions data yet.

  const AnimatedTabBar = require('@gorhom/animated-tabbar').default;

  interface CustomBubbleTabBarItemConfig extends BubbleTabBarItemConfig {
    permission: string;
  }

  const bubbleTabs: TabsConfig<CustomBubbleTabBarItemConfig> = {
    Home: {
      permission: 'base_permissions',
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
      permission: 'view_hall_monitor',

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
      permission: 'view_rooms',

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
    Accounts: {
      permission: 'create_accounts',

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
      permission: 'base_permissions',

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
  const filteredBubbleTaps = Object.fromEntries(
    Object.entries(bubbleTabs).filter(([key, value]) => userPermissions.includes(value.permission))
  );
  const tabBarFunction = (props: any) => (
    <AnimatedTabBar preset="bubble" tabs={filteredBubbleTaps} {...props} />
  );

  return tabBarFunction;
};

export let getCoreScreens = (userPermissions: string[]) => {
  if (!userPermissions || userPermissions.length == 0) userPermissions = ['base_permissions']; // Fall back to base permissions if we don't have any permissions data yet.

  const coreScreens = [
    {
      permission: 'base_permissions',
      name: 'Home',
      component: HomeScreenNavigation,
      icon: () => <HomeSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'view_hall_monitor',
      name: 'Hall Monitor',
      component: HallManagementNavigation,
      icon: () => <SearchSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'view_rooms',

      name: 'Rooms',
      component: RoomScreen,
      icon: () => <RoomSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'create_accounts',
      name: 'Accounts',
      component: Accounts,
      icon: () => <RoomSVG color={'black' as any} size={20} />,
    },
    {
      permission: 'base_permissions',

      name: 'Profile',
      component: ProfileScreen,
      icon: () => <ProfileSVG color={'black' as any} size={20} />,
    },
  ];
  const filteredScreens = coreScreens.filter(screen => userPermissions.includes(screen.permission));

  return filteredScreens;
};
