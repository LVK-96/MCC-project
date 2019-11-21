import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import projectService from '../services/projectService';

const login = async (email, password) => {
  try {
    const sign = await auth().signInWithEmailAndPassword(email, password);
    const token = await auth().currentUser.getIdToken(true); //does firebase track signed in users
    projectService.setToken(token);
    return {
      displayName: sign.user.displayName,
      email: sign.user.email,
      photoURL: sign.user.photoURL,
      uid: sign.user.uid
    };
  } catch (e) {
    throw e;
  }
};

const signup = async (email, displayName, password) => {
  try {
    const sign = await auth().createUserWithEmailAndPassword(email, password);
    const storageRef = storage().ref();
    const defaultRef = storageRef.child('profilepics/default.jpg');
    const defaultUrl = await defaultRef.getDownloadURL();
    await auth().currentUser.updateProfile({ displayName: displayName, photoURL: defaultUrl });
    const token = await auth().currentUser.getIdToken(true);
    projectService.setToken(token);
    return {
      displayName: displayName,
      email: sign.user._user.email,
      photoURL: defaultUrl,
      uid: sign.user._user.uid
    };
  } catch (e) {
    throw e;
  }
};

const changeProfilePic = async (uri, uid) => {
  try {
    const stats = await RNFetchBlob.fs.stat(uri);
    const storageRef = storage().ref();
    const profilepicRef = storageRef.child(`profilepics/${uid}.png`);
    await profilepicRef.putFile(stats.path);
    const imageUrl = await profilepicRef.getDownloadURL();
    await auth().currentUser.updateProfile({ photoURL: imageUrl });
    return imageUrl;
  } catch (e) {
    throw e;
  }
};

export default { login, signup, changeProfilePic };
