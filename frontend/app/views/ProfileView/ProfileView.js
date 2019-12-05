import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from '../Button';
import SettingsIcon from '../SettingsIcon';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import SettingsView from '../SettingsView';

function ProfileView({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const authenticationContext = useContext(AuthenticationContext);

  const changeProfilePic = () => {
    const options = {
      title: 'Select profile picture',
      storageOptions: {
          skipBackup: true,
          path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (!response.didCancel && !response.error) {
        try {
          await authenticationContext.changeProfilePic(response.uri);
        } catch (e) {
          Alert.alert('Failed to set profile picture!');
        }
      } else {
          console.log('Image picking failed: ', response);
      }
    });
  };

  const changePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const logout = async () => {
    try {
      await authenticationContext.logout();
    } catch (e) {
      Alert.alert('Failed to logout');
    }
  };

  if (authenticationContext.isLoggedIn) {
    return (
      <View style={styles.container}>
        <Modal style={styles.modal}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <SettingsView setModalVisible={setModalVisible} />
        </Modal>
        <View style={styles.header}/>
        <TouchableOpacity style={styles.avatarContainer} onPress={changeProfilePic}>
          <Image style={styles.avatar}
            source={{
              uri: authenticationContext.user.photoURL,
            }}
          />
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            <Text style={styles.name}>{authenticationContext.user.displayName}</Text>
            <Button title={'Change password'} onPress={changePassword} style={styles.profileButton} />
            <Button title={'Logout'} style={styles.profileButton} onPress={logout} color={'red'} />
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

export default ProfileView;
