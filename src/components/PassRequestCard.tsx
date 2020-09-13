import React from 'react';
import { Text } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import Timer from './Timer';
import { LinearGradient } from 'expo-linear-gradient';
import { adjustColor } from '../utils/colors';
import { Pass, PassRequest } from '../types/school';
import { approveRequest } from '../services/requestServices';

const PassRequestCard = ({
  requestSnapshot,
  style,
}: {
  requestSnapshot: firebase.firestore.DocumentSnapshot;
  style?: any;
}) => {
  const requestData: PassRequest = requestSnapshot.data() as PassRequest;
  const passInfo = requestData.passData;

  return (
    <LinearGradient
      colors={[passInfo.passColor, adjustColor(passInfo.passColor, -40)]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
      style={{
        backgroundColor: passInfo.passColor,
        borderRadius: 10,
        width: '50%',
        minHeight: 125,
        padding: 15,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
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
          {passInfo.passRecipientName}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => approveRequest(requestSnapshot)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 10,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            color: 'white',
            alignContent: 'center',
            justifyContent: 'center',
            padding: 15,
            fontFamily: 'Inter_800ExtraBold',
            fontSize: 18,
          }}>
          Approve Pass
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PassRequestCard;
