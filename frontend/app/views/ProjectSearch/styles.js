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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    width: '70%',
    backgroundColor: 'lightgrey'
  },
  toggleContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  projectContainer: {
    marginVertical: 20,
    height: '90%'
  }
});
