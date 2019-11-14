import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from '../Button';
import styles from './styles';

function ChangePasswordView() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  const changePassword = () => {
    console.log('Change password');
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
