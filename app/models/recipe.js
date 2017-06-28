let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: {
    type: Array,
    required: false,
  },
  steps: [
    {
      text: String,
      timer: Number,
    },
  ],
  lastTimeCoocked: {
    type: Date,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
});
schema.set('toJSON', {getters: true, virtuals: false});

/**
 */
class Recipe { }

schema.loadClass(Recipe);

module.exports = mongoose.model('Recipe', schema);
