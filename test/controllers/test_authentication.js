let User = require('../../app/models/user');
let app = require('../../app/app');
let db = require('../../app/databases/mongodb');
let chai = require('chai');
let assert = chai.assert;

describe('Authentication', () => {
  before(() => {
    return new User({username: `james.bond@example.com`, password: '1234'}).save();
  });

  after(() => {
    return User.remove({});
  });
  beforeEach(() => {
    return db.clearAllSessions();
  });
  describe('/POST authentication/login', () => {
      it('it should log in the user if username and password is correct', () => {
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'james.bond@example.com', password: '1234'})
          .then((res) => {
            assert.equal(res.status, 200);
          });
      });
      it('it should return a 401 error if username is incorrect', () => {
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'mr.bad@example.com', password: '1234'})
          .catch((res) => {
            assert.equal(res.status, 401);
          });
      });
      it('it should return a 401 error if password is incorrect', () => {
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'james.bond@example.com', password: 'crack'})
          .catch((res) => {
            assert.equal(res.status, 401);
          });
      });
      it('it should return a 401 error if password and username is incorrect', () => {
        return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'mr.bad@example.com', password: 'crack'})
          .catch((res) => {
            assert.equal(res.status, 401);
          });
      });
      it('it should create a new session after login', () => {
        return db.countSessions().then((res) => {
          assert.equal(res, 0);
          return chai.request(app.get())
          .post('/authentication/login')
          .send({username: 'james.bond@example.com', password: '1234'})
          .then((res) => {
            db.countSessions().then((res) => {
              assert.equal(res, 1);
            });
          });
        });
      });
  });

  describe('/POST authentication/logout', () => {
    it('it should logout the current logged in user', () => {
      let agent = chai.request.agent(app.get());
      return agent
        .post('/authentication/login')
        .send({username: 'james.bond@example.com', password: '1234'})
        .then(function(res) {
          return db.countSessions().then((res) => {
            assert.equal(res, 1);
            return agent
              .post('/authentication/logout')
              .then((res) => {
                return db.countSessions().then((res) => {
                  assert.equal(res, 0);
                });
              });
          });
        });
    });
  });
});
