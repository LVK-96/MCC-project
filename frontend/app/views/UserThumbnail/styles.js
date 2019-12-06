import {
  StyleSheet
} from 'react-native';

const size = 22;

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
  },
});
