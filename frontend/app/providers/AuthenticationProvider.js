import React, { useState, useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import SettingsContext from '../contexts/SettingsContext';
import NotificationContext from '../contexts/NotificationContext';
import authenticationService from '../services/authenticationService';
import fetchCorrectRes from '../util/fetchCorrectRes';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);

  const settingsContext = useContext(SettingsContext);
  const notificationContext = useContext(NotificationContext);

  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;

  const login = async ({ email, password }) => {
    //TODO: remove this in production
    if (email === 'placeholder@email.com'){
      setUser({ email: 'placeholder@email.com', uid: '13456' });
    } else {
      try {
        const loggedUser = await authenticationService.login(email, password);
        await saveFcmToken(loggedUser);
        const url = await fetchCorrectRes(loggedUser.photoURL, settingsContext.imageRes);
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
      await saveFcmToken(signedUser);
      const url = await fetchCorrectRes(signedUser.photoURL, settingsContext.imageRes);
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

  const saveFcmToken = async (user) => {
    // Save fcm token into user collection of database
    // For receiving notifications
    try {
      await authenticationService.saveFcmToken(user.uid, notificationContext.fcmToken);
    } catch (e) {
      console.log("Saving fcm token failed");
    }
  };

  const changeProfilePic = async (uri) => {
    try {
      const imageUrl = await authenticationService.changeProfilePic(uri, user.uid);
      const url = await fetchCorrectRes(imageUrl, settingsContext.imageRes);
      setUser({ ...user, photoURL: url });
    } catch (e) {
      throw new Error('Failed to save profile picture to cloud storage');
    }
  };

  const value = {
    login,
    signup,
    logout,
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
