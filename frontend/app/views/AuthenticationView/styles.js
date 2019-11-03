import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import fontSizes from '../../values/fontSizes';

const inputCommon = {
  width: '100%',
  marginHorizontal: '25%',
  height: 40,
  borderBottomColor: 'white',
  borderBottomWidth: 1,
  marginVertical: 3,
  color: 'white',
};

const buttonCommon = {
  width: '100%',
  paddingHorizontal: '12.5%',
  marginVertical: 10,
};

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.corporateBlue,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.massive,
    marginBottom: 10,
  },
  usernameInput: {
    ...inputCommon,
  },
  emailInput: {
    ...inputCommon,
  },
  passwordInput: {
    ...inputCommon,
  },
  authButton: {
    ...buttonCommon,
    marginTop: 15,
  },
  switchButton: {
    ...buttonCommon,
  },
});
