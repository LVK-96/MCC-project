class User {
  constructor(params) {
    this.uid = params.uid;
    this.fcmToken = params.fcmToken; // For receiving notifications
  }
}

module.exports = User;
