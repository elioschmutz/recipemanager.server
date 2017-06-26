let User = require('../../app/models/user');
let app = require('../../app/app');
let db = require('../../app/databases/mongodb');
let chai = require('chai');
let assert = chai.assert;
let config = require('config');

describe('Authentication', () => {
  describe('/POST authentication/login', () => {
      it('it should log in the user if username and password is correct', () => {
        let userProperties = config.testusers['admin'];
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: userProperties.username, password: userProperties.password})
          .then((res) => {
            assert.equal(res.status, 200);
          });
      });
      it('it should return a 401 error if username is incorrect', () => {
        let userProperties = config.testusers['admin'];
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'mr.bad@example.com', password: userProperties.password}).then(
            () => {
              throw new Error('Username should be invalid');
            }, (res) => {
              assert.equal(res.status, 401);
            });
      });
      it('it should return a 401 error if password is incorrect', () => {
        let userProperties = config.testusers['admin'];
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: userProperties.username, password: 'crack'}).then(
            () => {
              throw new Error('Password should be invalid');
            }, (res) => {
              assert.equal(res.status, 401);
            });
      });
      it('it should return a 401 error if password and username is incorrect', () => {
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'mr.bad@example.com', password: 'crack'}).then(
            () => {
              throw new Error('Password and username should be invalid');
            }, (res) => {
              assert.equal(res.status, 401);
            });
      });
  });
});
