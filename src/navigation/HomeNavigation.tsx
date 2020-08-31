import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Platform, useWindowDimensions, Dimensions } from 'react-native';

import { Button, Drawer, DrawerItem, IndexPath, Icon, Text } from '@ui-kitten/components';

import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { tabBarFunction, coreScreens } from './HomeNavConfigs';

export type MainHomeParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<MainHomeParamList>();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={tabBarFunction} initialRouteName="Home">
      {coreScreens.map(screenItem => (
        <Tab.Screen
          key={screenItem.name}
          name={screenItem.name as any}
          component={screenItem.component}
        />
      ))}
    </Tab.Navigator>
  );
};

// Home Drawer Navigation

const DrawerNav = createDrawerNavigator<MainHomeParamList>();
const isLargeScreen = Dimensions.get('window').width > 768;

const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => (
  <Drawer
    style={{
      marginVertical: 30,
    }}
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    {coreScreens.map(screenItem => (
      <DrawerItem title={screenItem.name} accessoryLeft={screenItem.accessoryLeft} />
    ))}
  </Drawer>
);

const HomeDrawerNavigation = () => (
  <DrawerNav.Navigator
    initialRouteName="Home"
    openByDefault
    drawerType={isLargeScreen ? 'permanent' : 'back'}
    drawerStyle={isLargeScreen ? { width: '25%' } : { width: '100%' }}
    overlayColor="transparent"
    drawerContent={props => <DrawerContent {...props} />}>
    {coreScreens.map(screenItem => (
      <DrawerNav.Screen name={screenItem.name as any} component={screenItem.component} />
    ))}
  </DrawerNav.Navigator>
);

const HomeNavigation = isLargeScreen ? HomeDrawerNavigation : HomeTabNavigation;

export default HomeNavigation;

// BROKEN DYNAMIC NAVIGATION UPDATE MECHANISM, PLACE UNDER HOME DRAWER NAVIGATION, REPLACING EVERYTHING
// const HomeNavigation = () => {
//   const [windowWidth, setWindowWidth] = React.useState(Dimensions.get('window').width);
//   const DrawerNav = createDrawerNavigator<MainHomeParamList>();

//   const isLargeScreen = windowWidth > 768;

//   // React.useEffect(() => {
//   //   Dimensions.addEventListener('change', ({ window }) => setWindowWidth(window.width));
//   //   const unsubscribe = Dimensions.removeEventListener('change', ({ window }) =>
//   //     setWindowWidth(window.width)
//   //   );

//   //   return unsubscribe;
//   // }, []);

//   const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => (
//     <Drawer
//       style={{ paddingVertical: 40 }}
//       selectedIndex={new IndexPath(state.index)}
//       onSelect={index => navigation.navigate(state.routeNames[index.row])}>
//       <DrawerItem title="Home" />
//       <DrawerItem title="Hall Monitor & Search" />
//       <DrawerItem title="Profile" />
//     </Drawer>
//   );

//   const HomeDrawerNavigation = () => (
//     <DrawerNav.Navigator
//       openByDefault
//       drawerType={isLargeScreen ? 'permanent' : 'back'}
//       drawerStyle={isLargeScreen ? null : { width: '100%' }}
//       overlayColor="transparent"
//       drawerContent={props => <DrawerContent {...props} />}>
//       <DrawerNav.Screen name="Home" component={HomeScreenNavigation} />
//       <DrawerNav.Screen name="Search" component={SearchScreen} />
//       <DrawerNav.Screen name="Profile" component={ProfileScreen} />
//     </DrawerNav.Navigator>
//   );

//   return Platform.OS === 'web' && isLargeScreen ? <HomeDrawerNavigation /> : <HomeTabNavigation />;
// };
