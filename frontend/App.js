import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AppView from './app/views/AppView';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={{ flex: 1 }}>
        <AppView/>
      </SafeAreaView>
    </>
  );
}

export default App;
