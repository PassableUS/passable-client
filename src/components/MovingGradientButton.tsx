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

  customColors = presetColors.instagram,
}: {
  onButtonPress: any;
  buttonText: string;
  style?: any;
  speed?: number;
  customColors?: any[];
}) => {
  return (
    <View
      style={{
        height: Platform.OS === 'web' ? '100%' : 120,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}>
      <TouchableOpacity
        style={{
          height: '100%',
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
