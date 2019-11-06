const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const taskSchema = mongoose.Schema({
  name: String,
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Project', taskSchema);
