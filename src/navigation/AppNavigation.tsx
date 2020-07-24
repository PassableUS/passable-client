import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import NotesNavigation from './NotesNavigation';
import LoadingScreen from '../features/loader/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

type AppStackParamList = {
  Auth: object;
  Notes: object;
  Loading: object;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  // const [hasUserToken, setHasUserToken] = useState(false)
  const {
    firebaseToken,
    isLoggedIn,
    isFirebaseInitializedAndLoaded,
    isProfileInitializedAndLoaded,
    hasCompletedProfile,
  } = useSelector((state: RootState) => state.session);

  const isLoading = !isFirebaseInitializedAndLoaded || !isProfileInitializedAndLoaded;
  const isRegistering = !isLoggedIn || !hasCompletedProfile;

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Stack.Navigator headerMode="none">
      {isRegistering ? (
        <>
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </>
      ) : (
        <>
          {/* User is signed in and done */}
          <Stack.Screen name="Notes" component={NotesNavigation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
