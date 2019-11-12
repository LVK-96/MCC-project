import { StyleSheet } from 'react-native';
import fontSizes from '../../values/fontSizes';

export default StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    elevation: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: fontSizes.large,
  },
  description: {
    marginVertical: 5,
  },
  deadline: {
    color: 'gray',
    fontSize: fontSizes.small,
  },
});