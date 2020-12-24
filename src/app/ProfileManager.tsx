import { gql, useApolloClient, useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { useAppDispatch } from './store';
import { setProfileData } from '../features/login/authSlice';

export const USER_PROFILE_DATA_QUERY = gql`
  query UserProfileQuery($id: uuid!) {
    users_by_pk(id: $id) {
      permissions {
        permission {
          name
        }
      }
      first_name
      last_name
    }
  }
`;

export interface permission {
  name: string;
}

const ProfileManager: React.FC = props => {
  const uid = useSelector((state: RootState) => state.auth.uid);
  const dispatch = useAppDispatch();

  const client = useApolloClient();

  const permissionsFlattener = (permissionWrapper: { permission: permission }) =>
    permissionWrapper.permission.name;

  useEffect(() => {
    console.log('Auth: Profile Data Query Triggered.');

    client
      .query({
        query: USER_PROFILE_DATA_QUERY,
        variables: { id: uid },
      })
      .then(({ data: profileData }) => {
        const data = profileData['users_by_pk'];
        const firstName = data.first_name;
        const lastName = data.last_name;
        const permissions = data.permissions.map(permissionsFlattener);

        dispatch(setProfileData({ firstName, lastName, permissions }));
      });
  }, []);

  return null;
};

export default ProfileManager;
