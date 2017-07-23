let Category = require('../../app/models/category');
let app = require('../../app/app');
let chai = require('chai');
let suite = require('../suite');
let config = require('config');
let assert = chai.assert;
let User = require('../../app/models/user');
let builder = require('../builder');

describe('Category', () => {
    afterEach(() => {
        return Category.remove({});
    });

  describe('/GET api/categories', () => {
      it('it should GET all the categories', () => {
        categories = [];
        categories.push(builder.category({title: 'Category 1'}));
        categories.push(builder.category({title: 'Category 2'}));
        categories.push(builder.category({title: 'Category 3'}));

        return Promise.all(categories).then((values) => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent).then((res) => {
                return agent
                .get('/api/categories')
                .then(function(res) {
                  assert.lengthOf(res.body, 3);
                  assert.equal(res.status, 200);
                });
            });
        });
      });
      it('it should GET only self created categories', () => {
        categories = [];
        categories.push(builder.category({title: 'Members category', _creator: config.testusers.member._id}));
        categories.push(builder.category({title: 'Admins category', _creator: config.testusers.admin._id}));

        return Promise.all(categories).then((values) => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent).then((res) => {
                return agent
                .get('/api/categories')
                .then(function(res) {
                  assert.lengthOf(res.body, 1);
                  assert.equal(res.status, 200);
                });
            });
        });
      });
  });

  describe('/POST api/categories', () => {
    it('it should create a new category', () => {
        let agent = chai.request.agent(app.get());
        return suite.login(agent).then((res) => {
            return agent
            .post('/api/categories')
            .send({title: 'Bread'})
            .then(function(res) {
                assert.equal(res.body.title, 'Bread');
            });
        });
    });
    it('it should add creator to the category', () => {
        let agent = chai.request.agent(app.get());
        return suite.login(agent).then((res) => {
            return agent
            .post('/api/categories')
            .send({title: 'Bread'})
            .then(function(res) {
                return User.findOne({'username': config.testusers.member.username}).exec().then((user) => {
                    assert.equal(res.body._creator, user.id);
                });
            });
        });
    });
  });
});
