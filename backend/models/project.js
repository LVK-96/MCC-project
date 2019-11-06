const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const projectSchema = mongoose.Schema({
  name: String,
});

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Project', projectSchema);
