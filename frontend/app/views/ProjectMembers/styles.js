import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  listItem: {
    marginLeft: 20,
    marginVertical: 10
  },
  buttonContainer: {
    bottom: 10,
    right: 30,
    alignSelf: 'flex-end',
  },
});

export default styles;
