import {
  StyleSheet
} from 'react-native';
import colors from '../../values/colors';

const size = 30;

const rounded = {
  width: size,
  height: size,
  borderRadius: size / 2,
};

export default StyleSheet.create({
  image: {
    ...rounded,
  },
  fallback: {
    ...rounded,
    backgroundColor: colors.corporateBlue,
    justifyContent: 'center',
    alignItems: 'center',
    margin: size / 10,
  },
  fallbackText: {
    color: 'white',
  },
});
