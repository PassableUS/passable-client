import React from 'react';
import { Text } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import FancyInput from '../../components/FancyInput';
import PageHeading from '../../components/PageHeading';

const AccountScreen = () => {
  // const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);=

  return (
    <DefaultLayout scrollable>
      <PageHeading />
      <FancyInput placeholder="Search for an account" />
    </DefaultLayout>
  );
};

export default AccountScreen;
