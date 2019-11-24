import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from '../Button';
import SettingsIcon from '../SettingsIcon';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function ProfileView({ navigation }) {
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
  }

  const changePassword = () => {
    navigation.navigate('ChangePassword');
  }

  const logout = async () => {
    try {
      await authenticationContext.logout();
    } catch (e) {
      Alert.alert('Failed to logout');
    }
  }

  if (authenticationContext.isLoggedIn) {
    return (
      <View style={styles.container}>
          <View style={styles.header}/>
          <TouchableOpacity style={styles.avatarContainer} onPress={changeProfilePic}>
            <Image style={styles.avatar}
              source={{
                uri: authenticationContext.user.photoURL,
              }}
            />
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{authenticationContext.user.displayName}</Text>
            </View>
            <Button title={'Change password'} onPress={changePassword} style={styles.profileButton} />
            <Button title={'Logout'} style={styles.profileButton} onPress={logout} color={'red'} />
            <TouchableOpacity style={styles.settingsButton}>
              <SettingsIcon />
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

export default ProfileView;
