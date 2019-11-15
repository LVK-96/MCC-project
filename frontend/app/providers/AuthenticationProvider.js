import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import auth from '@react-native-firebase/auth';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState({ email : 'nothing', displayName : 'nothing'});
  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;
  const login = async ({ email, password }) => {
    if (email === 'placeholder@email.com' && password === 'password') {
      setUser({email: 'something', displayName: 'also something'});
    } else {
      throw new Error('Failed to log in');
    }
  };
  const signup = async ({ email, displayName, password }) => {
    //ToDo: set environment variables using react-native-dotenv?
    if (__DEV__) {
      //developement build -  use mock data
      console.log('Developement');
      if (
        email === 'placeholder@email.com'
        && password === 'password'
        && displayName === 'placeholder'
      ) {
        setUser({ email, displayName });
        return {};
      } else {
        console.log('failed to signup with mock data');
        throw new Error('Failed to sign up with mock');
      }
    } else {
      //production build - use firebase auth
      console.log('Production');
    }
  };
  const value = {
    login,
    signup,
    user,
    /*By providing this, we can avoid the reimplementation of the logic that
      checks if a user is logged in outside of this component.*/
    /*userid and token also needed*/
    isLoggedIn,
  };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
