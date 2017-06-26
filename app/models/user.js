let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let config = require('config');
let validator = require('validator');

let schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: (value, callback) => {
        callback(validator.isEmail(value));
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'member',
  },

});

schema.set('toJSON', {
  getters: true,
  virtuals: false,
  transform: (doc, ret) => {
    delete ret.password;
  },
});
schema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password,
              config.authentication.salt_work_factor).then((hash) => {
      user.password = hash;
      return next();
  });
});

/**
 */
class User {

  /**
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  validatePassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password).then((isValid) => {
        if (isValid) {
          resolve();
        } else {
          reject('invalid password');
        }
      });
    });

  };

  resetPassword(password) {
    this.password = password;
    return this.save();
  }
}

schema.loadClass(User);

module.exports = mongoose.model('User', schema);
