let Router = require('express').Router;
let Category = require('../models/category');
let handleError = require('../helpers/handle-error');
let permission = require('permission');

router = new Router();

/*  "/"
 *    GET: find all categories. Filter the results by adding a query-parameter.
 *    POST: creates new category
 */
router.get('/categories', permission(), function(req, res) {
  Category.find({'_creator': req.user.id}).then(
    (categories) => {
      return res.status(200).json(categories);
    },
    (err) => {
      return handleError(res, err.message, 'Failed to get categories.');
    });
});

router.post('/categories', permission(), function(req, res) {
  const category = new Category(req.body);
  category._creator = req.user.id;

  category.save()
    .then(
      (category) => {
        res.status(201).json(category);
      },
      (reason) => {
        handleError(res, reason, 'Must provide a title.', 400);
      }
    );
});

/*  "/:id"
 *    GET: find a category with the given categoryid.
 *    PUT: updates a category with the given categoryid
 *    DELETE: removes a category with the given categoryid.
 */
router.get('/categories/:id', permission(), function(req, res) {
  let id = req.params.id;
  Category.findById(id)
    .then(
      (category) => {
        res.send(category);
      },
      (error) => {
        handleError(res, error.message, 'Failed to get category with id ' + id);
      }
    );
});

router.put('/categories/:id', function(req, res) {
  Category.findByIdAndUpdate(req.params.id,
                           {$set: res.body},
                           {new: true}, function(err, category) {
    if (err) return handleError(err);
    res.send(category);
  });
});

router.delete('/categories/:id', function(req, res) {
  Category.findByIdAndRemove(req.params.id)
    .then(
      (category) => {
        if (category) {
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
