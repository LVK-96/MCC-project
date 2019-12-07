import React, { useState, useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import SettingsContext from '../contexts/SettingsContext';
import NotificationContext from '../contexts/NotificationContext';
import authenticationService from '../services/authenticationService';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import fetchCorrectRes from '../util/fetchCorrectRes';
import memberService from '../services/memberService';
import userService from '../services/userService';

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
        const authToken = await authenticationService.getAuthToken();
        setToken(authToken);
        const url = await fetchCorrectRes(loggedUser.photoURL, settingsContext.imageRes);
        const fromFirestore = await userService.updateUser({ uid: loggedUser.uid, fcmToken: notificationContext.fcmToken });
        setUser({ ...fromFirestore, ...loggedUser, photoURL: url });
      } catch (e) {
        // In dev we might have a situation where we have a user in firebase in auth
        // but not in firestore
        if (e.message === 'User update failed') {
          const loggedUser = await authenticationService.login(email, password);
          const authToken = await authenticationService.getAuthToken();
          setToken(authToken);
          const url = await fetchCorrectRes(loggedUser.photoURL, settingsContext.imageRes);
          const fromFirestore = await userService.saveUser({
            name: loggedUser.displayName,
            uid: loggedUser.uid,
            fcmToken: notificationContext.fcmToken,
            photoURL: loggedUser.photoURL,
            favorites: [],
          });
          setUser({ ...fromFirestore, ...loggedUser, photoURL: url });
        } else {
          console.log('failed to login with firebase');
          throw new Error('Failed to login with firebase auth');
        }
      }
    }
  };

  const signup = async ({ email, displayName, password }) => {
    try {
      const signedUser = await authenticationService.signup(email, displayName, password);
      const authToken = await authenticationService.getAuthToken();
      setToken(authToken);
      const fromFirestore = await userService.saveUser({
        name: signedUser.displayName,
        uid: signedUser.uid,
        fcmToken: notificationContext.fcmToken,
        photoURL: signedUser.photoURL,
        favorites: [],
      });
      const url = await fetchCorrectRes(signedUser.photoURL, settingsContext.imageRes);
      setUser({ ...fromFirestore, ...signedUser, photoURL: url });
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
      const url = await fetchCorrectRes(imageUrl, settingsContext.imageRes);
      setUser({ ...user, photoURL: url });
    } catch (e) {
      throw new Error('Failed to save profile picture to cloud storage');
    }
  };

  const updateFavorites = async (id, isFavorite) => {
    try {
      let newUser;
      if (isFavorite && user.favorites.includes(id)) {
        newUser = { ...user, favorites: user.favorites.filter(f => f !== id) };
      } else if (!isFavorite && !user.favorites.includes(id)) {
        newUser = { ...user, favorites: user.favorites.concat(id) };
      } else {
        newUser = user;
      }

      await userService.updateUser(newUser);
      setUser(newUser);
    } catch (e) {
      throw e;
    }
  };

  const setToken = (token) => {
    projectService.setToken(token);
    taskService.setToken(token);
    memberService.setToken(token);
    userService.setToken(token);
  };

  const value = {
    login,
    signup,
    logout,
    changeProfilePic,
    updateFavorites,
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
