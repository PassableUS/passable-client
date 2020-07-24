import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import Emoji from 'react-native-emoji';

interface HeaderProps {
  style?: any;
  title?: string;
  subtitle?: string;
  emoji?: string;
}

const styles = StyleSheet.create({});

const Header: React.FC<HeaderProps> = props => {
  return (
    <View style={{ width: '100%', marginVertical: spacing.headerSpacing }}>
      {!props.emoji ? null : <Emoji name={props.emoji} style={{ fontSize: 50 }} />}
      <Text style={[{ marginBottom: spacing.textBlockSpacing }, typography.largeHeaderText]}>
        {props.title}
      </Text>
      <Text style={typography.mediumHeaderText}>{props.subtitle}</Text>
    </View>
  );
};

export default Header;
