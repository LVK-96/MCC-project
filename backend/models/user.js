const uniqid = require('uniqid');

class User {
  constructor(params) {
    this.id = uniqid(); // TODO: Is there some Firebase id that can replace this?
    this.username = params.username;
    this.email = params.email;
  }
}

module.exports = User;