import React, { useContext } from 'react';
import {
  Picker,
  View,
  Button,
} from 'react-native';
import SettingsContext from '../../contexts/SettingsContext';
import styles from './styles';

/*A component that shows the settings. Controls settings via SettingsContext.*/
function SettingsView({ setModalVisible }) {
  const settingsContext = useContext(SettingsContext);

  return (
    <View style={styles.bodyContent}>
      <Picker style={styles.resPicker}
        prompt="Image resolution"
        selectedValue={settingsContext.imageRes}
        onValueChange={value => settingsContext.setAndStoreImageRes(value)}>
        <Picker.Item label="Full" value="full" />
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Low" value="low" />
      </Picker>
      <Button title="Go back" onPress={() => setModalVisible(false)} style={styles.profileButton} color={'grey'} />
    </View>
  );
}

export default SettingsView;
