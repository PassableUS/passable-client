import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { View } from 'react-native';

export default function WavyHeader({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  customWavePattern,
}: any) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight }}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 200"
          // preserveAspectRatio="none"

          style={{ position: 'absolute', top: customTop }}>
          <Path fill={customBgColor} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
}
