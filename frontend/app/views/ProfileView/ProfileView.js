import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function ProfileView({ navigation }) {
  const authenticationContext = useContext(AuthenticationContext);

  const changeProfilePic = () => {
    console.log('Change profile pic');
  }

  const changePassword = () => {
    console.log('Change password');
    navigation.navigate('ChangePassword');
  }

  return (
      <View style={styles.container}>
          <View style={styles.header}/>
          <TouchableOpacity style={styles.avatarContainer} onPress={changeProfilePic}>
            <Image style={styles.avatar}
              source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
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
