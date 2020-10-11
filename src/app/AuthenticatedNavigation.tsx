import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dimensions } from 'react-native';

import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';

import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { studentTabBarFunction, getCoreScreens, tabBarFunction } from './AuthenticatedNavConfig';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

export type MainHomeParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainHomeParamList>();

const MainTabNavigation = () => {
  const role = useSelector((state: RootState) => state.setup.role);
  return (
    <Tab.Navigator
      tabBar={role === 'student' ? studentTabBarFunction : tabBarFunction}
      initialRouteName="Home">
      {getCoreScreens(role).map(screenItem => (
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

const MainDrawerNavigation = () => {
  const role = useSelector((state: RootState) => state.setup.role);

  const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => (
    <Drawer
      style={{
        marginVertical: 30,
      }}
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      {getCoreScreens(role).map(screenItem => (
        <DrawerItem
          title={screenItem.name}
          key={screenItem.name}
          accessoryLeft={screenItem.accessoryLeft}
        />
      ))}
    </Drawer>
  );

  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      openByDefault
      drawerType={isLargeScreen ? 'permanent' : 'back'}
      drawerStyle={isLargeScreen ? { width: '25%' } : { width: '100%' }}
      overlayColor="transparent"
      drawerContent={props => <DrawerContent {...props} />}>
      {getCoreScreens(role).map(screenItem => (
        <DrawerNav.Screen
          name={screenItem.name as any}
          key={screenItem.name}
          component={screenItem.component}
        />
      ))}
    </DrawerNav.Navigator>
  );
};

// Chooses whether to display the drawer navigation or tab navigation depending on the screen size
const MainNavigation = isLargeScreen ? MainDrawerNavigation : MainTabNavigation;

const AuthenticatedNavigation = () => {
  return <MainNavigation />;
};

export default AuthenticatedNavigation;

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
