import { StyleSheet } from 'react-native';
import colors from '../../values/colors';

const buttonCommon = {
  width: '100%',
  paddingHorizontal: '25%',
  marginVertical: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  header:{
    backgroundColor: colors.corporateBlue,
    height: 200,
  },
  avatarContainer: {
    alignSelf:'center',
    position: 'absolute',
    marginTop: 100,
  },
  avatar: {
    width: 130,
    height: 130,
  },
  body:{
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  name:{
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 32,
    color: colors.gray,
    fontWeight: "600",
    marginBottom: 10,
  },
  profileButton: {
    ...buttonCommon,
    height: 45,
    marginBottom: 10,
    borderRadius: 30,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  resPicker: {
    width: '80%',
    height: 40,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
});

export default styles;
