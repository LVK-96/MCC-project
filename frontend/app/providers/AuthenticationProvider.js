import React from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

/*Encapsulates authentication logic inside one component.*/
function AuthenticationProvider({ children }) {
  const login = async ({ email, password }) => {
    if (email === 'placeholder@email.com' && password === 'password') {
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
      return {};
    } else {
      throw new Error("Failed to sign up");
    }
  };
  const value = {
    login,
    signup,
  };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
