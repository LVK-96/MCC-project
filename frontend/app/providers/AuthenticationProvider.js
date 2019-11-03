import React, { useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  /*We are logged in if the user is set (not null).*/
  const isLoggedIn = !!user;
  const login = async ({ email, password }) => {
    if (email === 'placeholder@email.com' && password === 'password') {
      setUser({ email, displayName: 'placeholder' });
      return {};
    } else {
      throw new Error("Failed to log in");
    }
  };
  const signup = async ({ email, displayName, password }) => {
    if (
      email === 'placeholder@email.com'
      && password === 'password'
      && displayName === 'placeholder'
    ) {
      setUser({ email, displayName });
      return {};
    } else {
      throw new Error("Failed to sign up");
    }
  };
  const value = {
    login,
    signup,
    user,
    /*By providing this, we can avoid the reimplementation of the logic that
      checks if a user is logged in outside of this component.*/
    isLoggedIn,
  };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
