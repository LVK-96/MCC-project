import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import auth, { firebase } from '@react-native-firebase/auth'

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
    if (false) {
      //developement build -  use mock data
      console.log('Developement');
      if (
        email === 'placeholder@email.com'
        && password === 'password'
        && displayName === 'placeholder'
      ) {
        setUser({ email, displayName });
      } else {
        throw new Error('Failed to sign up with mock');
      }
    } else {
      //production build - use firebase auth
      console.log('Production');
      try {
        console.log('waiting response form firebase auth');
        const temp = await auth().createUserWithEmailAndPassword(email, password);
        const temp2 = await firebase.auth().currentUser.getIdToken(true);
        console.log(temp);
        console.log(temp2);
        console.log('firebase auth responded successfully?');
      } catch (e) {
          console.log('failed to signup with firebase');
          throw new Error('Failed to signup with firebase auth');

      }


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
