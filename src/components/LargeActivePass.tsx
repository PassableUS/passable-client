import React from 'react';
import { Pass } from '../features/main/StudentInfoScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { adjustColor } from '../utils/colors';
import Timer from './Timer';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

const LargeActivePass = ({ passInfo, style }: { passInfo: Pass; style?: any }) => {
  const [activeStatus, setActiveStatus] = React.useState(true);

  if (!activeStatus) {
    return null;
  }

  return (
    <LinearGradient
      colors={[passInfo.passColor, adjustColor(passInfo.passColor, -50)]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
      style={{
        backgroundColor: passInfo.passColor,
        borderRadius: 10,
        width: '100%',
        minHeight: 500,
        padding: 15,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        margin: 5,
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

      <View
        style={{
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
          {'Issuer: ' + passInfo.issuingUserName}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 10,
        }}>
        <Text>End Pass</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LargeActivePass;
