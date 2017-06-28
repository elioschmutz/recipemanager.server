let Recipe = require('../../app/models/recipe');
let app = require('../../app/app');
let chai = require('chai');
let suite = require('../suite');
let config = require('config');
let assert = chai.assert;
let User = require('../../app/models/user');

describe('Recipe', () => {
    afterEach(() => {
        return Recipe.remove({});
    });

  describe('/GET api/recipes', () => {
      it('it should GET all the recipes', () => {
        recipes = [];
        for (let i = 0; i < 3; i++) {
          recipes.push(new Recipe({name: `Recipe ${i}`}).save());
        }
        return Promise.all(recipes).then((values) => {
            let agent = chai.request.agent(app.get());
            return suite.login(agent, config.testusers.member).then((res) => {
                return agent
                .get('/api/recipes')
                .then(function(res) {
                  assert.lengthOf(res.body, 3);
                  assert.equal(res.status, 200);
                });
            });
        });
      });
  });

  describe('/POST api/recipes', () => {
    it('it should create a new recipe', () => {
        let agent = chai.request.agent(app.get());
        return suite.login(agent, config.testusers.member).then((res) => {
            return agent
            .post('/api/recipes')
            .send({name: 'James'})
            .then(function(res) {
                assert.equal(res.body.name, 'James');
            });
        });
    });
    it('it should add creator to the recipe', () => {
        let agent = chai.request.agent(app.get());
        return suite.login(agent, config.testusers.member).then((res) => {
            return agent
            .post('/api/recipes')
            .send({name: 'James'})
            .then(function(res) {
                return User.findOne({'username': config.testusers.member.username}).exec().then((user) => {
                    assert.equal(res.body.creator, user.id);
                });
            });
        });
    });
  });
});
