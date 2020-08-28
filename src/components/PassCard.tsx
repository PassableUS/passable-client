import React from 'react';
import { Text } from '@ui-kitten/components';
import { Pass } from '../features/main/StudentInfoScreen';
import { View } from 'react-native';
import Timer from './Timer';
import { LinearGradient } from 'expo-linear-gradient';

const PassCard = ({
  passInfo,
  showWhenInactive = false,
  style,
  displayTeacher,
  displayDateInsteadOfTime,
}: {
  passInfo: Pass;
  showWhenInactive?: boolean;
  style?: any;
  displayTeacher?: boolean;
  displayDateInsteadOfTime?: boolean;
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
      {displayDateInsteadOfTime ? (
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 15,
            paddingBottom: 10,
          }}>
          {passInfo.endTime.toDate().toDateString()}
        </Text>
      ) : (
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
      )}

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
          {displayTeacher ? 'Teacher: ' + passInfo.issuingUserName : passInfo.passRecipientName}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default PassCard;
