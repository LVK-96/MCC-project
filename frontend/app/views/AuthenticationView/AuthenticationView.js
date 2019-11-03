import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import colors from '../../values/colors';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function AuthenticationView() {
  const authenticationContext = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
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
  /*We only want to show the username in the signup form.
    This is a convenience variable used for conditional rendering.*/
  const showUsernameInput = form === "signup";
  /*To actually perform authentication, we need the form to be completely filled
    out.*/
  const formFilled = (email.length > 0) && (password.length > 0) && ((form === "login") || (username.length > 0));
  /*Logs in or signs up based on the values currently in the fields*/
  const performAuthentication = () => {
    if (form === "login") {
      authenticationContext.login({ email, password });
    } else {
      authenticationContext.signup({ email, password, displayName: username });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Task Manager
      </Text>
      { showUsernameInput &&
        <TextInput
          style={styles.usernameInput}
          placeholder="Your username"
          placeholderTextColor={colors.lightGray}
          value={username}
          onChangeText={text => setUsername(text)}
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
