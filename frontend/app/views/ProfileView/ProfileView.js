import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../Button';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function ProfileView({ navigation }) {
  const authenticationContext = useContext(AuthenticationContext);

  console.log(authenticationContext.user);
  // TODO: Move most of this logic to some other file
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
              const stats = await RNFetchBlob.fs.stat(response.uri);
              const storageRef = firebase.storage().ref();
              const profilepicRef = storageRef.child(`profilepics/${authenticationContext.user.uid}.png`);
              await profilepicRef.putFile(stats.path);
              const imageUrl = await profilepicRef.getDownloadURL();
              await authenticationContext.setProfilepic(imageUrl);
            } catch (exception ) {
              console.log(exception);
            }
        } else {
            console.log('Image picking failed: ', response);
        }
    });

  }


  const changePassword = () => {
    navigation.navigate('ChangePassword');
  }

  return (
      <View style={styles.container}>
          <View style={styles.header}/>
          <TouchableOpacity style={styles.avatarContainer} onPress={changeProfilePic}>
            <Image style={styles.avatar}
              source={{ uri: authenticationContext.user.photoURL }}/>
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{authenticationContext.user.displayName}</Text>
            </View>
            <Button title={'Logout'} style={styles.profileButton} />
            <Button title={'Change password'} onPress={changePassword} style={styles.profileButton} />
        </View>
      </View>
    );
}

export default ProfileView;
