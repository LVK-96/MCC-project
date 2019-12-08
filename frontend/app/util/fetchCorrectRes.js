import storage from '@react-native-firebase/storage';

const fetchCorrectRes = async (path, setting) => {
  const ref = storage().refFromURL(path);
  switch (setting) {
    case 'low':
      const tmpLow = ref.fullPath.split('.');
      const lowPath = tmpLow[0] + '_640x480.' + tmpLow[1];
      const lowRef = storage().ref(lowPath);
      try {
        return await lowRef.getDownloadURL();
      } catch (e) {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }

    case 'high':
      const tmpHigh = ref.fullPath.split('.');
      const highPath = tmpHigh[0] + '_1280x960.' + tmpHigh[1];
      const highRef = storage().ref(highPath);
      try {
        return await highRef.getDownloadURL();
      } catch (e) {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }

    case 'full':
      try {
        return await ref.getDownloadURL();
      } catch (e) {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }

    default:
      try {
        return await ref.getDownloadURL();
      } catch (e) {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
  }
};

export default fetchCorrectRes;
