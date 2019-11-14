import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import colors from '../../values/colors';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function AuthenticationView({
  navigation,
}) {
  const authenticationContext = useContext(AuthenticationContext);
  /*Change to Main screen if we have logged in*/
  /*
  useEffect(() => {
    if (authenticationContext && navigation) {
      navigation.navigate("Main");
    }
  });
  */
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*Describes which form you are currently in: login or signup.
    These are similar enough to share one component but have minor differences,
    which are controlled via this toggle.*/
  const [form, setForm] = useState("login");
  const authButtonTitle = (form === "login") ? "Log in" : "Sign up";
  const switchButtonTitle = (form === "login")
    ? "Don't have an account? Sign up now"
    : "Already have an account? Log in here";
  const switchForms = () => setForm(
    (form === "login") ? "signup" : "login"
  );
  /*We only want to show the display name in the signup form.
    This is a convenience variable used for conditional rendering.*/
  const showDisplayNameInput = form === "signup";
  /*To actually perform authentication, we need the form to be completely filled
    out.*/
  const formFilled = (email.length > 0) && (password.length > 0) && ((form === "login") || (displayName.length > 0));
  /*Logs in or signs up based on the values currently in the fields*/
  const performAuthentication = () => {
    if (form === "login") {
      authenticationContext
        .login({ email, password })
        .catch(() => Alert.alert(
          "Failed to log in",
          "Please recheck your credentials.",
          [{ text: 'OK', onPress: () => {}}],
        ));
      navigation.navigate('Main');
    } else {
      authenticationContext
        .signup({ email, password, displayName })
        .catch(() => Alert.alert(
          "Signup failed",
          "Try another display name.",
          [{ text: 'OK', onPress: () => {}}],
        ));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Task Manager
      </Text>
      { showDisplayNameInput &&
        <TextInput
          style={styles.displayNameInput}
          placeholder="Your display name"
          placeholderTextColor={colors.lightGray}
          value={displayName}
          onChangeText={text => setDisplayName(text)}
        />
      }
      <TextInput
        style={styles.emailInput}
        placeholder="Your email"
        placeholderTextColor={colors.lightGray}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.passwordInput}
        placeholder="Your password"
        placeholderTextColor={colors.lightGray}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        style={styles.authButton}
        title={authButtonTitle}
        disabled={!formFilled}
        onPress={performAuthentication}
      />
      <Button
        style={styles.switchButton}
        title={switchButtonTitle}
        onPress={switchForms}
      />
    </View>
  );
}

export default AuthenticationView;
