import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NotificationContext from '../contexts/NotificationContext';

/*A provider that provides a value for the NotificationContext, allowing
  notificiations to be used.*/
function NotificationProvider({ children }) {
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    checkPermission();
    messageListener();
  },[]);

  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      PushNotification.cancelLocalNotifications({id: notification.id}); // cancel on press
    },
  });

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
  };

  const getFcmToken = async () => {
    try {
      const t = await messaging().getToken();
      setFcmToken(t);
      console.log(t);
    } catch (e) {
      console.log('Failed fetching fcm token');
    }
  };

  const messageListener = async () => {
    messaging().onMessage((message) => {
      showNotification(message.data.title, message.data.body);
    });
  };

  const showNotification = async (title, body) => {
    PushNotification.localNotification({
      title: title,
      message: body,
    });
  };

  const value = { fcmToken };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
