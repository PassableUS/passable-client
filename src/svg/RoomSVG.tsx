import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path, PathProps } from 'react-native-svg';
import { SVGProps } from './types';
import Icon from 'react-native-dynamic-vector-icons';

const AnimatedPath = (Animated.createAnimatedComponent(Path) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const RoomSVG = ({ color, size }: SVGProps) => {
  return <Icon name="google-classroom" type="MaterialCommunityIcons" color="black" />;
};

export default RoomSVG;
