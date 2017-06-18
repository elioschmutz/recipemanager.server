let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },

});
schema.set('toJSON', {getters: true, virtuals: false});

/**
 */
class User {

  /**
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

schema.loadClass(User);

module.exports = mongoose.model('User', schema);
