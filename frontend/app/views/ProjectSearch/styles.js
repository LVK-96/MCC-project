import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  searchPicker: {
    width: '80%'
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '20%'
  },
  projectContainer: {
    marginVertical: 20,
    height: '80%'
  },
  searchInput: {
    height: 40,
    width: '80%',
    backgroundColor: 'lightgrey'
  },
  keywordPicker: {
    width: '80%',
  }
});
