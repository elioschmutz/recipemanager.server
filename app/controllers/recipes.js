let Router = require('express').Router;
let RecipeModel = require('../models/recipe');
let handleError = require('../helpers/handle-error');
let permission = require('permission');

router = new Router();

/*  "/"
 *    GET: find all recipes. Filter the results by adding a query-parameter.
 *    POST: creates new recipe
 */
router.get('/recipes', permission(), function(req, res) {
  RecipeModel.find().then(
    (recipes) => {
      return res.status(200).json(recipes);
    },
    (err) => {
      return handleError(res, err.message, 'Failed to get recipes.');
    });
});

router.post('/recipes', permission(), function(req, res) {
  const recipe = new RecipeModel(req.body);
  recipe.creator = req.user.id;

  recipe.save()
    .then(
      (recipe) => {
        res.status(201).json(recipe);
      },
      (reason) => {
        handleError(res, reason, 'Must provide a name.', 400);
      }
    );
});

/*  "/:id"
 *    GET: find a recipes with the given recipeid.
 *    PUT: updates a recipe with the given recipeid
 *    DELETE: removes a recipe with the given recipeid.
 */
router.get('/recipes/:id', function(req, res) {
  let id = req.params.id;
  RecipeModel.findById(id)
    .then(
      (recipe) => {
        res.send(recipe);
      },
      (error) => {
        handleError(res, error.message, 'Failed to get recipe with id ' + id);
      }
    );
});

router.put('/recipes/:id', function(req, res) {
  RecipeModel.findByIdAndUpdate(req.params.id,
                           {$set: res.body},
                           {new: true}, function(err, recipe) {
    if (err) return handleError(err);
    res.send(recipe);
  });
});

router.delete('/recipes/:id', function(req, res) {
  RecipeModel.findByIdAndRemove(req.params.id)
    .then(
      (recipe) => {
        if (recipe) {
          res.status(204).json();
        } else {
          res.status(404).json();
        }
      },
      (reason) => {
        handleError(res, reason, 'Error', 400);
      }
    );
});

module.exports = router;
