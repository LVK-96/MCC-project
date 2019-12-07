import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  MenuProvider
} from 'react-native-popup-menu';
import AppView from './app/views/AppView';


function App() {
  return (
    <MenuProvider>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={{ flex: 1 }}>
        <AppView/>
      </SafeAreaView>
    </MenuProvider>
  );
}

export default App;
