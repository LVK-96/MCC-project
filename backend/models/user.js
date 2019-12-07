class User {
  constructor(params) {
    this.uid = params.uid;
    this.fcmToken = params.fcmToken; // For receiving notifications
    this.name = params.name;
    this.photoURL = params.photoURL;
    // TODO: propably also need to have username and link to profilepic here
  }
}

module.exports = User;
