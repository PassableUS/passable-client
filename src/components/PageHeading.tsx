import React, { ReactChildren } from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Div } from 'react-native-magnus';

interface PageHeadingProps {
  headingHeight?: number;
}

const PageHeading: React.FC<PageHeadingProps> = props => {
  return (
    <Div
      style={{
        width: '100%',
        height: props.headingHeight || 200,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 60,
      }}>
      <Div
        shadow="lg"
        rounded="xl"
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'white',
        }}>
        {props.children}
      </Div>
    </Div>
  );
};

export default PageHeading;
