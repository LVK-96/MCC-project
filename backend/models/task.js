const uniqid = require('uniqid');

class Task {
  constructor(params) {
    this.id = uniqid();
    this.name = params.name;
    this.status = 'Pending';
  }
}

module.exports = Task;