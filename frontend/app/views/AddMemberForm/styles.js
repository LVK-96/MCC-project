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
    justifyContent: 'space-around',
    marginTop: 20,
  },
  containerItem: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  },
  searchInput: {
    height: 40,
    width: 260,
    backgroundColor: 'lightgrey'
  },
  backButton: {
    height: 45,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
  },
});
