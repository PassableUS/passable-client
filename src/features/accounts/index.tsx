import React from 'react';
import { Text } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import FancyInput from '../../components/FancyInput';
import PageHeading from '../../components/PageHeading';
import { Div } from 'react-native-magnus';
import FancyButton from '../../components/FancyButton';
import Icon from 'react-native-dynamic-vector-icons';
import PageContent from '../../components/PageContent';

const AccountScreen = () => {
  return (
    <DefaultLayout>
      <PageHeading>
        <Div p={20} h="100%" flex={1} row justifyContent="space-between" alignItems="center">
          <Div flex={3}>
            <Text category="h1">Accounts</Text>
          </Div>
          <Div flex={4} row justifyContent="space-around" alignItems="center">
            <FancyInput style={{ flex: 4 }} placeholder="Search for students" />

            <FancyButton
              accessoryLeft={() => <Icon name="md-add" type="Ionicons" color="white" />}
              style={{ flex: 5, marginLeft: 20, maxWidth: 100, height: 60 }}>
              <Text category="s1" style={{ color: 'white' }}>
                Add
              </Text>
            </FancyButton>
          </Div>
        </Div>
      </PageHeading>
      {/* <FancyInput placeholder="Search for an account" /> */}
      <PageContent pageContentWidth="100%">
        <Div shadow="xl" h="100%" w="100%" bg="white" rounded="xl" p={20}></Div>
      </PageContent>
    </DefaultLayout>
  );
};

export default AccountScreen;
