import storage from '@react-native-firebase/storage';

let setting = null;

export const setResSetting = (value) => {
  setting = value;
};

export const applyResSetting = async (path) => {
  const ref = storage().refFromURL(path);
  switch (setting) {
    case 'low':
      const tmpLow = ref.fullPath.split('.');
      const lowPath = tmpLow[0] + '_640x480.' + tmpLow[1];
      const lowRef = storage().ref(lowPath);
      return await lowRef.getDownloadURL();

    case 'high':
      const tmpHigh = ref.fullPath.split('.');
      const highPath = tmpHigh[0] + '_1280x960.' + tmpHigh[1];
      const highRef = storage().ref(highPath);
      return await highRef.getDownloadURL();

    case 'full':
      return await ref.getDownloadURL();

    default:
      return await ref.getDownloadURL();
  }
};

