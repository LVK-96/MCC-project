import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import auth, { firebase } from '@react-native-firebase/auth';
import mockData from '../../mock.json';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;
  const login = async ({ email, password }) => {
    if (email === 'placeholder@email.com' && password === 'password') {
      setUser({email: 'placeholder@email.com', displayName: 'placeholder', uid: mockData.UID, token: mockData.TOKEN});
    } else {
      throw new Error('Failed to log in');
    }
  };
  const signup = async ({ email, displayName, password }) => {
    if (__DEV__) {
      //developement build -  use mock data
      console.log('Developement');
      if (
        email === 'placeholder@email.com'
        && password === 'password'
        && displayName === 'placeholder'
      ) {
        //ToDO: set uid and token into a state
        setUser({email: email, displayName: displayName, uid: mockData.UID, token: mockData.TOKEN});
      } else {
        throw new Error('Failed to sign up with mock');
      }
    } else {
      //production build - use firebase auth
      console.log('Production');
      try {
        console.log('waiting response from firebase auth');
        const temp = await auth().createUserWithEmailAndPassword(email, password);
        const temp2 = await firebase.auth().currentUser.getIdToken(true);
        //ToDO: set uid and token into a state

        console.log(temp);
        console.log(temp2);
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
