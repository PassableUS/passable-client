import React from 'react';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import FancyInput from '../../components/FancyInput';
import PageHeading from '../../components/PageHeading';
import { Div } from 'react-native-magnus';
import FancyButton from '../../components/FancyButton';
import Icon from 'react-native-dynamic-vector-icons';
import PageContent from '../../components/PageContent';

import {
  TabBar,
  Tab,
  Layout,
  Text,
  Icon as UIKittenIcon,
  Button,
  Card,
  Modal,
} from '@ui-kitten/components';
import { permission } from '../../app/ProfileManager';
import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

const PersonIcon = (props: any) => <UIKittenIcon {...props} name="person-outline" />;

const BellIcon = (props: any) => <UIKittenIcon {...props} name="bell-outline" />;

const EmailIcon = (props: any) => <UIKittenIcon {...props} name="email-outline" />;

const permissionsFlattener = (permissionWrapper: { permission: permission }) =>
  permissionWrapper?.permission?.name;

const tabIndexToAccountType = (selectedIndex: number) => {
  if (selectedIndex === 0) return 'student';
  if (selectedIndex === 1) return 'teacher';
  if (selectedIndex === 2) return 'admin';
  alert('Invalid tab index selected. Defaulting back to student.');
  return 'student';
};

const GET_ACCOUNTS = gql`
  query GetSchoolAccounts($school_id: uuid = "", $role: String = "") {
    schools_users(where: { school_id: { _eq: $school_id }, role: { _eq: $role } }) {
      user {
        full_name
        first_name
        last_name
        id
        updated_at
        permissions {
          permission {
            name
          }
        }
      }
    }
  }
`;

const flattenAccountsData = (accountsData: any) => {
  // return accountsData;
  return accountsData?.schools_users.map((userWrapper: any) => {
    const userData = userWrapper['user'];

    return {
      id: userData['id'],
      fullName: userData['full_name'],
      permissions: permissionsFlattener(userData['permissions']),
      updatedAt: userData['updated_at'],
    };
  });
};

const AccountScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [createUserModalVisible, setCreateUserModalVisible] = React.useState(false);
  const authProfile = useSelector((state: RootState) => state.auth.profile);

  // Accounts Data Query
  // Refetch will refresh the data
  // Flatten accounts data will flatten the accounts data and makes use of the permissionsFlattener that is used in the app initialization
  const {
    loading: accountsLoading,
    error: accountsError,
    data: accountQueryData,
    refetch: refetchAccountQuery,
  } = useQuery(GET_ACCOUNTS, {
    variables: {
      role: tabIndexToAccountType(selectedIndex),
      school_id: authProfile?.currentSchool?.id,
    },
  });
  const accountsData = flattenAccountsData(accountQueryData);

  return (
    <DefaultLayout>
      <PageHeading>
        <Div p={20} h="100%" flex={1} row justifyContent="space-between" alignItems="center">
          <Div flex={3}>
            <Text category="h1">Accounts</Text>
          </Div>
          <Div flex={4} row justifyContent="space-around" alignItems="center">
            <FancyInput style={{ flex: 4 }} placeholder="Search accounts" />

            <FancyButton
              onPress={() => setCreateUserModalVisible(true)}
              accessoryLeft={() => <Icon name="md-add" type="Ionicons" color="white" />}
              style={{ flex: 5, marginLeft: 20, maxWidth: 100, height: 60 }}>
              <Text category="s1" style={{ color: 'white' }}>
                Add
              </Text>
            </FancyButton>
            <FancyButton
              accessoryLeft={() => <Icon name="md-refresh" type="Ionicons" color="white" />}
              style={{ flex: 5, marginLeft: 20, maxWidth: 150, height: 60 }}>
              <Text category="s1" style={{ color: 'white' }} onPress={() => refetchAccountQuery()}>
                Refresh
              </Text>
            </FancyButton>
          </Div>
        </Div>
        <Div>
          <TabBar selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
            <Tab icon={PersonIcon} title="Students" />
            <Tab icon={PersonIcon} title="Teachers" />
            <Tab icon={PersonIcon} title="Admins" />
          </TabBar>
        </Div>
      </PageHeading>
      <PageContent pageContentWidth="100%">
        <Div flex={1} row h="100%" w="100%" mb={50}>
          <Div shadow="xl" flex={1} h="100%" bg="white" rounded="xl" m={20}>
            {accountsError && (
              <Text category="h3">
                Something went wrong while retrieving the accounts data.{' '}
                {JSON.stringify(accountsError)}
              </Text>
            )}
            <Text>{JSON.stringify(accountsData)}</Text>
          </Div>
        </Div>
      </PageContent>
      <CreateUserModal
        createUserModalVisible={createUserModalVisible}
        setCreateUserModalVisible={setCreateUserModalVisible}
      />
    </DefaultLayout>
  );
};

const CreateUserModal = ({
  createUserModalVisible,
  setCreateUserModalVisible,
}: {
  createUserModalVisible: boolean;
  setCreateUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      visible={createUserModalVisible}>
      <Card disabled={true}>
        <Text>Welcome to UI Kitten 😻</Text>
        <Button onPress={() => setCreateUserModalVisible(false)}>Dismiss</Button>
      </Card>
    </Modal>
  );
};

const AccountList = () => {
  return <Div flex></Div>;
};

export default AccountScreen;
