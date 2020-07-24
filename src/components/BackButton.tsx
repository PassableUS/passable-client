import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
  navigation: NavigationProp<any, any>;
}

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ width: 60 }} onPress={() => navigation.goBack()}>
      <Ionicons name="ios-arrow-back" style={{ padding: 10 }} size={32} color={colors.textColor} />
    </TouchableOpacity>
  );
};

export default BackButton;
