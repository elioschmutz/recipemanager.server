let mongoose = require('mongoose');
let User = require('./user');

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
  _creationDate: {
    type: Date,
    default: Date.now,
  },
  _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
  _modificationDate: {
    type: Date,
    default: Date.now,
  },
});
schema.set('toJSON', {getters: true, virtuals: false});

/**
 */
class Recipe {
  setCreatorByUserName(username) {
    return User.findOne({'username': username}).exec().then((user) => {
      this._creator = user.id;
      return this.save();
    });
  }
}

schema.loadClass(Recipe);

module.exports = mongoose.model('Recipe', schema);
