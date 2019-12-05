const uniqid = require('uniqid');

class Task {
  constructor(params) {
    this.id = uniqid();
    this.description = params.description;
    this.status = 'Pending';
  }
}

module.exports = Task;
