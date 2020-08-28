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
import { Platform, useWindowDimensions, Dimensions, View } from 'react-native';
import ProfileScreen from '../features/main/ProfileScreen';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import CreatePassScreen from '../features/main/CreatePassScreen';
import { Button, Drawer, DrawerItem, IndexPath, Icon, Text } from '@ui-kitten/components';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import StudentInfoScreen from '../features/main/StudentInfoScreen';
import SearchScreen from '../features/main/SearchScreen';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';

export type MainHomeParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<MainHomeParamList>();

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
    schoolIssuedId?: string;
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

// TODO: Add SearchScreen to the navigation of the search tab screen

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={tabBarFunction} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        // initialParams={{
        //   backgroundColor: tabs.Home.labelStyle.color,

        component={HomeScreenNavigation}
      />
      <Tab.Screen
        name="Search"
        //   backgroundColor: tabs.Search.labelStyle.color,

        component={HallManagementNavigation}
      />
      <Tab.Screen
        name="Profile"
        //   backgroundColor: tabs.Profile.labelStyle.color,

        component={ProfileScreen}
      />
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
    <DrawerItem
      title="Home"
      accessoryLeft={() => (
        <View style={{ paddingLeft: 10 }}>
          <HomeSVG color={'black' as any} size={20} />
        </View>
      )}
    />
    <DrawerItem
      title="Hall Monitor & Search"
      accessoryLeft={() => (
        <View style={{ paddingLeft: 10 }}>
          <SearchSVG color={'black' as any} size={20} />
        </View>
      )}
    />
    <DrawerItem
      title="Profile"
      accessoryLeft={() => (
        <View style={{ paddingLeft: 10 }}>
          <ProfileSVG color={'black' as any} size={20} />
        </View>
      )}
    />
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
    <DrawerNav.Screen name="Home" component={HomeScreenNavigation} />
    <DrawerNav.Screen name="Search" component={HallManagementNavigation} />
    <DrawerNav.Screen name="Profile" component={ProfileScreen} />
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
