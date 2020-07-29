import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import LoadingScreen from '../features/loader/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { auth } from '../components/FirebaseAuthenticator';
import { useAuthState } from 'react-firebase-hooks/auth';

type AppStackParamList = {
  Auth: object;
  Main: object;
  Loading: object;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  // const [hasUserToken, setHasUserToken] = useState(false)
  // const {
  //   firebaseToken,
  //   isLoggedIn,
  //   isFirebaseInitializedAndLoaded,
  //   isProfileInitializedAndLoaded,
  //   hasCompletedProfile,
  // } = useSelector((state: RootState) => state.session);

  // const isLoading = !isFirebaseInitializedAndLoaded || !isProfileInitializedAndLoaded;
  // const isRegistering = !isLoggedIn || !hasCompletedProfile;

  const [user, loading, error] = useAuthState(auth);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Stack.Navigator headerMode="none">
      {!user ? (
        <>
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </>
      ) : (
        <>
          {/* User is signed in and done */}
          <Stack.Screen name="Main" component={HomeNavigation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
