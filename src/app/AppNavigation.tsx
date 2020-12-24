import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from '../features/login/LoginNavigation';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import LoadingScreen from '../features/loader/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { auth } from './AppAuthentication';
import { useAuthState } from 'react-firebase-hooks/auth';

type AppStackParamList = {
  Auth: object;
  Main: object;
  Loading: object;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  // const [hasUserToken, setHasUserToken] = useState(false)

  // const isLoading = !isFirebaseInitializedAndLoaded || !isProfileInitializedAndLoaded;
  // const isRegistering = !isLoggedIn || !hasCompletedProfile;

  const authState = useSelector((state: RootState) => state.auth);
  const isIn = authState.status === 'in';

  const [user, loading, error] = useAuthState(auth);
  // const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.setup);

  return loading ? (
    <LoadingScreen context="Awaiting authentication..." />
  ) : (
    <Stack.Navigator headerMode="none">
      {/* If we don't have the user object or if the redux state says we are not logged in or if the redux state is loading, show the login screen */}
      {!user || !isIn ? (
        <>
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </>
      ) : (
        <>
          {/* User is signed in and done */}
          <Stack.Screen name="Main" component={AuthenticatedNavigation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
