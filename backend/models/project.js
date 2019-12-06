const uniqid = require('uniqid');

class Project {
  constructor(params) {
    this.id = uniqid();
    this.iconSource = params.iconSource;
    this.name = params.name;
    this.description = params.description;
    this.deadline = params.deadline;
    this.favorite = false;
    this.owner = params.owner;
    this.created = this.dateRegex(new Date().toISOString());
    this.modified = this.created;
    this.keywords = params.keywords;
    this.deadlineNotified = false;
  }

  dateRegex(ISODateString) {
    const regex = /.+?(?=T)/;
    return ISODateString.match(regex).toString();
  }
}

module.exports = Project;
