import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, GestureResponderEvent, TextInputProps, Animated } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface FancyInputProps extends TextInputProps {
  label?: string;
}

const FancyInput: React.FC<FancyInputProps> = props => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    input: {
      width: '100%',
      height: 40, // Adjusts how much space there is between the border
      borderBottomColor: colors.primaryColor,
      borderBottomWidth: 2,
      // Add input text styling
      ...typography.inputText,
    },
    labelStyle: {},
  });

  const test = new Animated.Value(isFocused ? 0 : 1);

  useEffect(() => {
    isFocused
      ? Animated.timing(test, {
          toValue: 1,
          duration: 600,
        }).start()
      : Animated.timing(test, {
          toValue: 0,
          duration: 600,
        }).start();
  }, [isFocused]);

  return (
    <>
      <Animated.Text style={{ position: 'relative', opacity: test, top: 10 }}>
        {props.label}
      </Animated.Text>

      <TextInput
        // placeholderTextColor={typography.inputText.color}
        // textAlignVertical="bottom"
        {...props}
        style={[styles.input, props?.style]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        blurOnSubmit
      />
    </>
  );
};

export default FancyInput;
