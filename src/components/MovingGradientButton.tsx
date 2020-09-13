import React from 'react';
import { View, GestureResponderEvent, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@ui-kitten/components';
import MovingLinearGradient from './MovingLinearGradient';
import { presetColors } from './MovingLinearGradient';

const MovingGradientButton = ({
  onButtonPress,
  buttonText,
  style,
  speed = 4000,
  buttonHeight,
  customColors = presetColors.instagram,
}: {
  onButtonPress: any;
  buttonText: string;
  style?: any;
  speed?: number;
  buttonHeight: number;
  customColors?: any[];
}) => {
  return (
    <View
      style={{
        height: buttonHeight,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
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
      <TouchableOpacity
        style={{
          height: Platform.OS === 'web' ? buttonHeight : '100%',
          width: '100%',
        }}
        onPress={onButtonPress}>
        <MovingLinearGradient
          customColors={customColors}
          speed={speed}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 10,
            padding: 15,
            alignContent: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontFamily: 'Inter_800ExtraBold',
              fontSize: 20,
              textAlign: 'center',
            }}>
            {buttonText}
          </Text>
        </MovingLinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default MovingGradientButton;
