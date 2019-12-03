import auth from '@react-native-firebase/auth';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import projectService from '../services/projectService';

const baseUrl = 'http://10.0.2.2:3000/users'; // TODO: use env var for this

const login = async (email, password) => {
  try {
    const sign = await auth().signInWithEmailAndPassword(email, password);
    const token = await auth().currentUser.getIdToken(true);
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
    const path = defaultRef.toString();
    await auth().currentUser.updateProfile({ displayName: displayName, photoURL: path });
    const token = await auth().currentUser.getIdToken(true);
    projectService.setToken(token);
    return {
      displayName: displayName,
      email: sign.user._user.email,
      photoURL: path,
      uid: sign.user._user.uid
    };
  } catch (e) {
    throw e;
  }
};

const saveFcmToken = async (uid, fcmToken) => {
  try {
    await axios.post(baseUrl, {
      uid: uid,
      fcmToken: fcmToken,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const logout = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    throw e;
  }
};

const changeProfilePic = async (uri, uid) => {
  try {
    const stats = await RNFetchBlob.fs.stat(uri);
    const format = stats.path.split('.')[1];
    const storageRef = storage().ref();
    const profilepicRef = storageRef.child(`profilepics/${uid}.${format}`);
    await profilepicRef.putFile(stats.path);
    const path = profilepicRef.toString();
    await auth().currentUser.updateProfile({ photoURL: path });
    return path;
  } catch (e) {
    throw e;
  }
};

const checkPassword = async (oldPassword) => {
  try {
    const credential = auth.EmailAuthProvider.credential(
      auth().currentUser.email,
      oldPassword
    );
    await auth().currentUser.reauthenticateWithCredential(credential);
    return true;
  } catch (e) {
    return false;
  }
};

const changePassword = async (newPassword) => {
  try {
    // For some reason try-catch doesnt catch this? Maybe some bug with rn firebase.
    if (newPassword === '') throw new Error('Empty password!');
    await auth().currentUser.updatePassword(newPassword);
  } catch (e) {
    throw e;
  }
};

export default {
  login,
  signup,
  logout,
  saveFcmToken,
  changeProfilePic,
  checkPassword,
  changePassword
};
