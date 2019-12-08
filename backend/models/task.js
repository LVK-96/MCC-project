const uniqid = require('uniqid');

class Task {
  constructor(params) {
    this.id = uniqid();
    this.projectId = params.projectId;
    this.description = params.description;
    this.status = 'Pending';
    this.created = new Date().toISOString();
    this.deadlineNotified = false;
    this.asignees = [];
  }
}

module.exports = Task;
