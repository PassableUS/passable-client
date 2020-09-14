import React from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
import Timer from './Timer';
import { LinearGradient } from 'expo-linear-gradient';
import { adjustColor } from '../utils/colors';
import { Pass } from '../types/school';
import moment from 'moment';

const PassCard = ({
  passInfo,
  showWhenInactive = false,
  style,
  displayIssuer,
  displayDateInsteadOfTime,
  handlePassExpire,
}: {
  passInfo: Pass;
  showWhenInactive?: boolean;
  style?: any;
  displayIssuer?: boolean;
  displayDateInsteadOfTime?: boolean;
  handlePassExpire?: any;
}) => {
  const [activeStatus, setActiveStatus] = React.useState(true);

  // React.useEffect(() => {
  //   if (!activeStatus && !showWhenInactive) {
  //     handlePassExpire(passInfo);
  //   }
  // }, [activeStatus]);

  if (!activeStatus && !showWhenInactive) {
    return null;
  }

  return (
    <View
      style={{
        width: '50%',
        minHeight: 125,
        maxHeight: displayDateInsteadOfTime ? 150 : 125,
        shadowColor: '#000',
        borderRadius: 10,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        ...style,
      }}>
      <LinearGradient
        colors={[passInfo.passColor, adjustColor(passInfo.passColor, -40)]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        locations={[0.0, 1.0]}
        style={{
          backgroundColor: passInfo.passColor,
          borderRadius: 10,
          height: '100%',
          width: '100%',
          padding: 15,
          alignContent: 'space-between',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontFamily: 'Inter_800ExtraBold',
            fontSize: 15,
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
            {moment(passInfo.endTime.toDate()).format('llll')}
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
            {displayIssuer ? 'Issuer: ' + passInfo.issuingUserName : passInfo.passRecipientName}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PassCard;
