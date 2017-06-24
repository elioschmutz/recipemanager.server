let User = require('../../app/models/user');
let chai = require('chai');
let assert = chai.assert;

describe('User Model', () => {
    afterEach(() => {
        return User.remove({});
    });

    it('username is required', () => {
      return assert.isRejected(
        new User({password: '1234'}).save());
    });

    it('it should validate the username as an email', () => {
      return assert.isRejected(
        new User({username: 'not a valid email', password: '1234'}).save());
    });

    it('password is required', () => {
      return assert.isRejected(
        new User({username: 'elio.schmutz@msn.com'}).save());
    });

    it('password is encrypted', () => {
      return assert.doesNotBecome(
        new User({username: 'elio.schmutz@msn.com', password: '1234'}).save(),
        '1234');
    });

    it('password validation with correct password returns true', () => {
      return new User({username: 'elio.schmutz@msn.com', password: '1234'}).save().then((user) => {
        return assert.becomes(user.validatePassword('1234'), true);
      });
    });

    it('password validation with invalid password returns false', () => {
      return new User({username: 'elio.schmutz@msn.com', password: '1234'}).save().then((user) => {
        return assert.becomes(user.validatePassword('xxxx'), false);
      });
    });

      return new User({username: 'elio.schmutz@msn.com', password: '1234'}).save().then((user) => {
    it('json representation does not return password', () => {
        return assert.notProperty(user.toJSON(), 'password');
      });
    });
});
