import React from 'react';
import {
  StatusBar,
} from 'react-native';
import AppView from './app/views/AppView';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <AppView/>
    </>
  );
}

export default App;
