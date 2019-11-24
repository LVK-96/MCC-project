import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import { applyResSetting } from '../util/applyResSetting';
import projectService from '../services/projectService';

const login = async (email, password) => {
  try {
    const sign = await auth().signInWithEmailAndPassword(email, password);
    const token = await auth().currentUser.getIdToken(true);
    projectService.setToken(token);
    const photoURL = applyResSetting(sign.user.photoURL);
    return {
      displayName: sign.user.displayName,
      email: sign.user.email,
      photoURL: photoURL,
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
    const photoURL = applyResSetting(defaultUrl);
    await auth().currentUser.updateProfile({ displayName: displayName, photoURL: defaultUrl });
    const token = await auth().currentUser.getIdToken(true);
    projectService.setToken(token);
    return {
      displayName: displayName,
      email: sign.user._user.email,
      photoURL: photoURL,
      uid: sign.user._user.uid
    };
  } catch (e) {
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
    const storageRef = storage().ref();
    const profilepicRef = storageRef.child(`profilepics/${uid}.png`);
    await profilepicRef.putFile(stats.path);
    const imageUrl = await profilepicRef.getDownloadURL();
    await auth().currentUser.updateProfile({ photoURL: imageUrl });
    return applyResSetting(imageUrl);
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
  changeProfilePic,
  checkPassword,
  changePassword
};
