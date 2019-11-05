import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import fontSizes from '../../values/fontSizes';

const styles = StyleSheet.create({
  header:{
    backgroundColor: colors.corporateBlue,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: colors.gray,
    fontWeight: "600"
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: colors.corporateBlue,
  },
  buttonText: {
    color: '#ffffff',
  }
});

export default styles;
