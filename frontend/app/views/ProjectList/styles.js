import { StyleSheet } from 'react-native';
import fontSizes from '../../values/fontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: fontSizes.large,
    marginHorizontal: 20,
    marginTop: 10,
  },
  projectsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createProjectButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
  }
});
