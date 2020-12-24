import React from 'react';
import { Text } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import FancyInput from '../../components/FancyInput';

const RoomScreen = () => {
  // const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);=

  return (
    <DefaultLayout scrollable>
      <Text category="h1" style={{ marginTop: 30, marginBottom: 20 }}>
        Rooms
      </Text>
      <FancyInput placeholder="Search for a room" />
    </DefaultLayout>
  );
};

export default RoomScreen;
