let bcrypt = require('bcrypt');
let config = require('config');
let validator = require('validator');
let mongoose = require('mongoose');
let BaseSchema = require('./base');
let _ = require('lodash');


let schema = new BaseSchema({
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
  role: {
    type: String,
    default: config.user.defaultRole,
  },

});
schema.set('toJSON', _.extend({
  transform: (doc, ret) => {
    delete ret.password;
  }}, schema.options['toJSON'])
);

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

  static getUserByUserName(username) {
    return this.findOne({'username': username}).exec().then((user) => {
      return user;
    });
  }
}

schema.loadClass(User);

module.exports = mongoose.model('User', schema);
