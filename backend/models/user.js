class User {
  constructor(params) {
    this.uid = params.uid;
    this.fcmToken = params.fcmToken; // For receiving notifications
    this.name = params.name;
    this.photoURL = params.photoURL;
    this.favorites = []; // favorite project ids
  }
}

module.exports = User;
