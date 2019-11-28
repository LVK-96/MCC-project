import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SettingsContext from '../contexts/SettingsContext';

function SettingsProvider({ children }) {
  const [imageRes, setImageRes] = useState('full'); // low, high or full

  useEffect(() => {
    const getResSetting = async () => {
      // Get resolution setting from local storage
      try {
        const value = await AsyncStorage.getItem('@res');
        if (value !== null) {
          setImageRes(value);
        }
      } catch (e) {
        setImageRes('full'); // default setting
      }
    };

    getResSetting();
  }, []); // Only call on first load

  const storeRes = async (value) => {
    // Store resolution setting in local storage
    try {
      await AsyncStorage.setItem('@res', value);
    } catch (e) {
      // pass, If saving fails the setting will be reset on app restart
    }
  };

  const setAndStoreImageRes = async (setting) => {
    storeRes(setting);
    setImageRes(setting);
    // TODO: Should we also reload images in new res?
  };

  const value = {
    imageRes,
    setAndStoreImageRes,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
