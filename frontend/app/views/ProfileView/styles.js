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
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name:{
    fontSize: 32,
    color: colors.gray,
    fontWeight: "600",
    marginBottom: 10,
  },
  profileButton: {
    ...buttonCommon,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 30,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginTop: '55%',
    marginHorizontal: 20,
  },
});

export default styles;
