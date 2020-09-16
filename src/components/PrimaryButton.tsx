import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { Text } from '@ui-kitten/components';

interface PrimaryButtonProps {
  onPress: any;
  text: string;
  color: string;
  icon?: string;
  iconType?: string;
}

const PrimaryButton = ({ onPress, text, color, icon, iconType }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: color, padding: 20, borderRadius: 10, marginTop: 10 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon && iconType && (
          <Icon
            name={icon}
            type={iconType}
            size={20}
            color="white"
            // onPress={() => {
            //   navigation.goBack();
            // }}
          />
        )}
        <Text
          category="s1"
          style={{
            marginLeft: 10,
            color: 'white',
            fontSize: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
