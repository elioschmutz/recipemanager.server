let Recipe = require('../../app/models/recipe');
let env = require('../env');
let chai = require('chai');
let assert = chai.assert;

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
          return chai.request(env.app.get())
            .get('/api/recipes')
            .then(function(res) {
              assert.lengthOf(res.body, 3);
              assert.equal(res.status, 200);
            });
        });
      });
  });

  describe('/POST api/recipes', () => {
    it('it should create a new recipe', () => {
      return chai.request(env.app.get())
        .post('/api/recipes')
        .send({name: 'James'})
        .then(function(res) {
          assert.equal(res.body.name, 'James');
        });
    });
  });
});
