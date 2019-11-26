import React, { useContext } from 'react';
import {
  Picker,
  View,
  Button,
} from 'react-native';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import styles from './styles';

function SettingsView({ setModalVisible }) {
  const authenticationContext = useContext(AuthenticationContext);

  return (
    <View style={styles.bodyContent}>
      <Picker style={styles.resPicker}
        prompt="Image resolution"
        selectedValue={authenticationContext.imageRes}
        onValueChange={value => authenticationContext.setAndStoreImageRes(value)}>
        <Picker.Item label="Full" value="full" />
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Low" value="low" />
      </Picker>
      <Button title="Go back" onPress={() => setModalVisible(false)} style={styles.profileButton} color={'grey'} />
    </View>
  );
}

export default SettingsView;
