import {
  StyleSheet
} from 'react-native';
import colors from '../../values/colors';

const size = 30;

const common = {
  width: size,
  height: size,
  borderRadius: size / 2,
  justifyContent: 'center',
  alignItems: 'center',
  margin: size / 10,
};

export default StyleSheet.create({
  image: {
    ...common,
  },
  fallback: {
    ...common,
    backgroundColor: colors.corporateBlue,
  },
  fallbackText: {
    color: 'white',
  },
});
