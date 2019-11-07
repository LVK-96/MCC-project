const mongoose = require('mongoose');
// Is this needed? mongoose.set('useFindAndModify', false);

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'on-going', 'completed'],
  },
  asignees:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Task', taskSchema);
