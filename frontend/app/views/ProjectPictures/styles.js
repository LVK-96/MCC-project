import {
  StyleSheet
} from 'react-native';
import fontSizes from '../../values/fontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headerText: {
    fontSize: fontSizes.large,
    marginHorizontal: 20,
    marginTop: 10,
  },
  noPictures: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  picturesBottom: {
    marginBottom: 60,
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 20,
    marginBottom: 10,
  },
  contentArea: {
      marginLeft: 20,
  },
});
