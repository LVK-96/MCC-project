import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function ProfileView() {
  const authenticationContext = useContext(AuthenticationContext);

  return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{authenticationContext.user.displayName}</Text>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Delete profile</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
}

export default ProfileView;
