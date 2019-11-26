import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AuthenticationContext from '../contexts/AuthenticationContext';
import authenticationService from '../services/authenticationService';
import fetchCorrectRes from '../util/fetchCorrectRes';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  const [imageRes, setImageRes] = useState('full'); // low, high or full

  useEffect(() => {
    const getResSetting = async () => {
      // Get resolution setting from local storage
      try {
        const value = await AsyncStorage.getItem('@res');
        if (value !== null) {
          setImageRes(value);
        }
      } catch (e) {
        setImageRes('full'); // default setting
      }
    };

    getResSetting();
  }, []); // Only call on first load

  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;

  const storeRes = async (value) => {
    // Store resolution setting in local storage
    try {
      await AsyncStorage.setItem('@res', value);
    } catch (e) {
      // pass, If saving fails the setting will be reset on app restart
    }
  };

  const login = async ({ email, password }) => {
    //TODO: remove this in production
    if (email === 'placeholder@email.com'){
      setUser({ email: 'placeholder@email.com', uid: '13456' });
    } else {
      try {
        const loggedUser = await authenticationService.login(email, password);
        const url = await fetchCorrectRes(loggedUser.photoURL, imageRes);
        setUser({ ...loggedUser, photoURL: url });
      } catch (e) {
        // TODO: If profile pic fetching fails dont fail login just set empty url
        console.log('failed to login with firebase');
        throw new Error('Failed to login with firebase auth');
      }
    }
  };

  const signup = async ({ email, displayName, password }) => {
    try {
      const signedUser = await authenticationService.signup(email, displayName, password);
      const url = await fetchCorrectRes(signedUser.photoURL, imageRes);
      setUser({ ...signedUser, photoURL: url });
    } catch (e) {
      // TODO: If profile pic fetching fails dont fail login just set empty url
      console.log('failed to signup with firebase');
      throw new Error('Failed to signup with firebase auth');
    }
  };

  const logout = async () => {
    try {
      await authenticationService.logout();
      setUser(null);
    } catch (e) {
      throw new Error('Logout failed');
    }
  };

  const changeProfilePic = async (uri) => {
    try {
      const imageUrl = await authenticationService.changeProfilePic(uri, user.uid);
      setUser({ ...user, photoURL:  imageUrl });
    } catch (e) {
      throw new Error('Failed to save profile picture to cloud storage');
    }
  };

  const setAndStoreImageRes = async (setting) => {
    storeRes(setting);
    setImageRes(setting);
    // TODO: Should we also reload images in new res?
  };

  const value = {
    login,
    signup,
    logout,
    changeProfilePic,
    user,
    imageRes,
    setAndStoreImageRes,
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
