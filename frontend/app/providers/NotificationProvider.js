import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationContext from '../contexts/NotificationContext';

function NotificationProvider({ children }) {
  useEffect(() => {
    checkPermission();
    messageListener();
  },[]);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  const getFcmToken = async () => {
    try {
      const t = await messaging().getToken();
      console.log(t);
    } catch (e) {
      console.log('Failed fetching fcm token');
    }
  };

  const messageListener = async () => {
    messaging().onMessage((message) => {
      console.log(message.data);
      showAlert(message.data.title, message.data.body); // TODO: Show this as push notification?
    });
  };

  const showAlert = (title, body) => {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  const value = { showAlert };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
