import React from 'react';
import { Text, StyleSheet, GestureResponderEvent, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface ButtonProps {
  style?: any;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    height: 50,
    // alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 15,
  },
});

const FancyButton: React.FC<ButtonProps> = props => {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
        {props.loading ? (
          <ActivityIndicator color={colors.contrastText} />
        ) : (
          <Text style={[styles.text, typography.buttonText]}>{props.text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FancyButton;
