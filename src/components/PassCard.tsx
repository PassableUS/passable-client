import React from 'react';
import { Text } from '@ui-kitten/components';
import { Pass } from '../features/main/StudentInfoScreen';
import { View } from 'react-native';
import Timer from './Timer';

const PassCard = ({
  passInfo,
  showWhenInactive = false,
  style,
  unmountPass,
}: {
  passInfo: Pass;
  showWhenInactive?: boolean;
  style?: any;
  unmountPass: any;
}) => {
  const [activeStatus, setActiveStatus] = React.useState(true);
  function adjustColor(color: any, amount: any) {
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color: any) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        )
    );
  }

  if (!activeStatus && !showWhenInactive) {
    unmountPass();
  }

  return (
    <View
      style={{
        backgroundColor: passInfo.passColor,
        borderRadius: 10,
        height: 125,
        width: '50%',
        padding: 15,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: '600',
          fontFamily: 'Inter_800ExtraBold',
          fontSize: 20,
          textAlign: 'center',
        }}>
        {passInfo.toLocationName}
      </Text>
      <Timer
        timerTextStyle={{
          color: 'white',
          textAlign: 'center',
          fontSize: 15,
          paddingBottom: 10,
        }}
        setActiveStatus={(status: any) => setActiveStatus(status)}
        targetTime={passInfo.endTime.toDate()}
      />
      {/* <Text style={{ color: 'white' }}>{JSON.stringify(passInfo.endTime)} remaining</Text> */}
      <View
        style={{
          backgroundColor: adjustColor(passInfo.passColor, -20),
          borderRadius: 10,
          padding: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15,
            textAlign: 'center',
          }}>
          {passInfo.issuingUserName}
        </Text>
      </View>
    </View>
  );
};

export default PassCard;
