import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import authenticationService from '../../services/authenticationService';
import Button from '../Button';
import styles from './styles';

function ChangePasswordView({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  const changePassword = async () => {
    if (newPassword === newPasswordAgain) {
      if (await authenticationService.checkPassword(oldPassword)) {
        try {
          await authenticationService.changePassword(newPassword);
          setOldPassword('');
          setNewPasswordAgain('');
          setNewPassword('');
          navigation.navigate('Profile');
        } catch (e) {
          Alert.alert('Something went wrong');
        }
      } else {
        Alert.alert('The old password is wrong!');
      }
    } else {
      Alert.alert('New passwords do not match!');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Old password</Text>
        <TextInput style={styles.input} value={oldPassword} onChangeText={value => setOldPassword(value)}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New password</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={value => setNewPassword(value)}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New password again</Text>
        <TextInput style={styles.input} value={newPasswordAgain} onChangeText={value => setNewPasswordAgain(value)}/>
      </View>
      <View style={styles.inputContainer}>
        <Button title={'Change password'} onPress={changePassword} />
      </View>
    </View>
  );
}

export default ChangePasswordView;
