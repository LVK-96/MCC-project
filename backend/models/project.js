const uniqid = require('uniqid');

class Project {
  constructor(params) {
    this.id = uniqid();
    this.name = params.name;
    this.owner = params.owner;
    this.tags = params.tags;
  }
}

module.exports = Project;