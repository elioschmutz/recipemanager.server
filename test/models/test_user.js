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
        new User({username: 'james.bond@example.com'}).save());
    });

    it('password is encrypted', () => {
      return assert.doesNotBecome(
        new User({username: 'james.bond@example.com', password: '1234'}).save(),
        '1234');
    });

    it('password validation with correct password resolves promise', () => {
      return new User({username: 'james.bond@example.com', password: '1234'}).save().then((user) => {
        return user.validatePassword('1234');
      });
    });

    it('password validation with invalid password rejects promise', () => {
      return new User({username: 'james.bond@example.com', password: '1234'}).save().then((user) => {
        return user.validatePassword('xxxx').then(
          () => {
            throw new Error();
          }, (res) => { });
      });
    });

    it('json representation does not return password', () => {
      return new User({username: 'james.bond@example.com', password: '1234'}).save().then((user) => {
        return assert.notProperty(user.toJSON(), 'password');
      });
    });

    it('email is set by username', () => {
      return new User({username: 'james.bond@example.com', password: '1234'}).save().then((user) => {
        return assert.equal(user.toJSON().emailAddress, 'james.bond@example.com');
      });
    });
});
