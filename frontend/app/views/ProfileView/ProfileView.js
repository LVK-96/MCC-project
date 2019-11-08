import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Button from '../Button';
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
              <Text style={styles.name}>User</Text>
            </View>
            <Button title='Logout' style={styles.profileButton} />
            <Button title='Delete profile' style={styles.profileButton} color={'red'} />
        </View>
      </View>
    );
}

export default ProfileView;
