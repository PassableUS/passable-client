import { gql, useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { useAppDispatch } from './store';
import { profileSchool, setProfileData } from '../features/login/authSlice';

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
      schools {
        school {
          id
          name
        }
      }
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

  const schoolsFlattener = (schoolsWrapper: { school: profileSchool }) => ({
    name: schoolsWrapper.school.name,
    id: schoolsWrapper.school.id,
  });

  useEffect(() => {
    console.log('Auth: Profile Data Query Triggered.');

    try {
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
          const schools = data.schools.map(schoolsFlattener);
          const currentSchool = schools[0];

          if (!currentSchool)
            alert(
              'No assigned schools. App may be in an unstable state. Please log out and log in again.'
            );

          dispatch(setProfileData({ firstName, lastName, permissions, schools, currentSchool }));
        });
    } catch (e) {
      alert(
        'Error retrieving profile data: ' + JSON.stringify(e) + '. Please restart the application.'
      );
    }
  }, [uid]);

  return null;
};

export default ProfileManager;
