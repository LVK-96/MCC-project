const uniqid = require('uniqid');

class Task {
  constructor(params) {
    this.id = uniqid();
    this.description = params.description;
    this.status = 'Pending';
    this.created = new Date().toISOString();
  }
}

module.exports = Task;
