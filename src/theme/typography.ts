import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  largeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  largeHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  mediumHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondaryTextColor,
  },
  paragraphText: {
    fontSize: 14,
    color: colors.secondaryTextColor,
  },
  inputText: {
    fontSize: 18,
    color: colors.textColor,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.secondaryTextColor,
    fontWeight: 'bold',
  },
  buttonText: {
    color: colors.contrastText,
    fontWeight: 'bold',
    fontSize: 15,
  },
  smallExplainerText: {
    color: colors.secondaryTextColor,
    fontSize: 11,
  },
});
