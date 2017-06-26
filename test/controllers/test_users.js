let config = require('config');
let app = require('../../app/app');
let chai = require('chai');
let assert = chai.assert;
let suite = require('../suite');
let User = require('../../app/models/user');

describe('User', () => {
    describe('/GET api/users', () => {
        it('anonymous has no access', () => {
            return chai.request(app.get())
            .get('/api/users').then(
                () => {
                  throw new Error('Anonymous should have no access');
                }, (res) => {
                  assert.equal(res.status, 401);
                });
        });
        it('member has no access', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.member).then((res) => {
                return agent.get('/api/users').then(
                    () => {
                      throw new Error('Member should have no access');
                    }, (res) => {
                      assert.equal(res.status, 403);
                    });
            });
        });
        it('it should GET all the users', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.admin).then((res) => {
                return agent.get('/api/users').then(function(res) {
                    assert.lengthOf(res.body, 2);
                    assert.equal(res.status, 200);
                });
            });
        });
    });

    describe('/POST api/users', () => {
        it('anonymous has no access', () => {
            return chai.request(app.get())
            .post('/api/users').then(
                () => {
                  throw new Error('Anonymous should have no access');
                }, (res) => {
                  assert.equal(res.status, 401);
                });
        });
        it('member has no access', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.member).then((res) => {
                return agent.post('/api/users').then(
                    () => {
                      throw new Error('Member should have no access');
                    }, (res) => {
                      assert.equal(res.status, 403);
                    });
            });
        });
        it('it should create a new user', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.admin).then((res) => {
                return agent
                .post('/api/users')
                .send({username: 'james.bond@example.com', password: '1234'})
                .then(function(res) {
                    assert.equal(res.body.username, 'james.bond@example.com');
                });
            });
        });
    });
    describe('/GET api/current_user', () => {
        it('anonymous has no access', () => {
            return chai.request(app.get())
            .get('/api/current_user').then(
                () => {
                  throw new Error('Anonymous should not have access');
                }, (res) => {
                  assert.equal(res.status, 401);
                });
        });
        it('it should return the current logged-in user', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.member).then((res) => {
                return agent.get('/api/current_user').then((res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.username, config.testusers.member.username);
                });
            });
        });
    });
    describe('/PUT api/current_user/change_password', () => {
        it('anonymous has no access', () => {
            return chai.request(app.get())
            .put('/api/current_user/change_password').then(
                () => {
                  throw new Error('Anonymous should have no access');
                }, (res) => {
                  assert.equal(res.status, 401);
                });
        });
        it('it should change the password of the current logged-in user', () => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.member).then((res) => {
                return agent.put('/api/current_user/change_password')
                            .send({password: 'secure'})
                            .then((res) => {
                    assert.equal(res.status, 200);
                    return suite.login(agent, {username: config.testusers.member.username,
                                               password: 'secure'}).then((res) => {
                        return User.findOne({'username': config.testusers.member.username}).exec().then((user) => {
                            return user.validatePassword('secure');
                        });
                    });
                });
            });
        });
    });
});
