let mongoose = require('mongoose');
let handleError = require('../helpers/handle-error');

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
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
