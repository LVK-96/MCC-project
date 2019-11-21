import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import authenticationService from '../services/authenticationService';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;
  const login = async ({ email, password }) => {
    //TODO: remove this in production
    if (email === 'placeholder@email.com'){
      setUser({ email: 'placeholder@email.com', uid: '13456' });
    } else {
      try {
        const loggedUser = await authenticationService.login(email, password);
        setUser(loggedUser);
      } catch (e) {
        console.log('failed to login with firebase');
        throw new Error('Failed to login with firebase auth');
      }
    }
  };

  const signup = async ({ email, displayName, password }) => {
    try {
      const signedUser = await authenticationService.signup(email, displayName, password);
      setUser(signedUser);
    } catch (e) {
      console.log('failed to signup with firebase');
      throw new Error('Failed to signup with firebase auth');
    }
  };

  const changeProfilePic = async (uri) => {
    try {
      const imageUrl = await authenticationService.changeProfilePic(uri, user.uid);
      setUser({ ...user, photoURL:  imageUrl });
    } catch (e) {
      console.log(e);
      throw new Error('Failed to save profile picture to cloud storage');
    }
  }

  const value = {
    login,
    signup,
    changeProfilePic,
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
