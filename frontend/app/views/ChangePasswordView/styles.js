import { StyleSheet } from 'react-native';
import fontSizes from '../../values/fontSizes';


export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    marginHorizontal: '25%',
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 3,
    backgroundColor: 'white',
  },
  label: {
      alignSelf: 'flex-start',
      fontSize: fontSizes.large,
      marginHorizontal: '12%',
  }
});
