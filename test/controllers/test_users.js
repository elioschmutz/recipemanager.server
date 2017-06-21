let User = require('../../app/models/user');
let env = require('../env');
let chai = require('chai');
let assert = chai.assert;

describe('User', () => {
    afterEach(() => {
        return User.remove({});
    });

  describe('/GET api/users', () => {
      it('it should GET all the users', () => {
        users = [];
        for (let i = 0; i < 3; i++) {
          users.push(new User({username: `user.${i}@example.com`, password: '1234'}).save());
        }
        return Promise.all(users).then((values) => {
          return chai.request(env.app.get())
            .get('/api/users')
            .then(function(res) {
              assert.lengthOf(res.body, 3);
              assert.equal(res.status, 200);
            });
        });
      });
  });

  describe('/POST api/users', () => {
    it('it should create a new user', () => {
      return chai.request(env.app.get())
        .post('/api/users')
        .send({username: 'max.muster@example.com', password: '1234'})
        .then(function(res) {
          assert.equal(res.body.username, 'max.muster@example.com');
        });
    });
  });
});
