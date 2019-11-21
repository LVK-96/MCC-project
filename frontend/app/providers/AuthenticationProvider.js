import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import auth, { firebase } from '@react-native-firebase/auth';
import mockData from '../../mock.json';
import projectService from '../services/projectService';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;
  const login = async ({ email, password }) => {
    //TODO: remove this in production
    if (email === 'placeholder@email.com'){
      setUser({email: 'placeholder@email.com', uid: '13456' });
    } else {
      const sign = await auth().signInWithEmailAndPassword(email, password);
      const token = await auth().currentUser.getIdToken(true); //does firebase track signed in users
      setUser({ email: email, photoURL: sign.user.photoURL, uid: sign.user.uid }); //how to retrieve displayName
      projectService.setToken(token);
    }
  };

  const signup = async ({ email, displayName, password }) => {
    //production build - use firebase auth
    console.log('Production');
    try {
      console.log('waiting response from firebase auth');
      const sign = await auth().createUserWithEmailAndPassword(email, password);
      const token = await auth().currentUser.getIdToken(true); //does firebase track signed in users - how does signing out work
      setUser({email: email, displayName:displayName, uid: sign.user.uid});
      projectService.setToken(token);
    } catch (e) {
        console.log('failed to signup with firebase');
        throw new Error('Failed to signup with firebase auth');
    }
  };

  const setProfilepic = async (url) => {
    setUser({ ...user, photoUrl: url });
    await firebase.auth().currentUser.updateProfile({ photoURL: url });
  }

  const value = {
    login,
    signup,
    setProfilepic,
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
