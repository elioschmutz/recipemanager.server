let Router = require('express').Router;
let User = require('../models/user');
let handleError = require('../helpers/handle-error');
let permission = require('permission');

router = new Router();

/*  "/"
 *    GET: find all users. Filter the results by adding a query-parameter.
 *    POST: creates new user
 */
router.get('/users', permission(['admin']), function(req, res) {
  User.find().then(
    (users) => {
      return res.status(200).json(users);
    },
    (err) => {
      return handleError(res, err.message, 'Failed to get users.');
    });
});

router.post('/users', permission(['admin']), function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName});

  user.save()
    .then((user) => {
        res.status(201).json(user);
      }, (reason) => {
        if (reason.code == 11000) {
          handleError(res, reason, 'The user with this username already exists.', 409);
        } else {
          handleError(res, reason, 'Something went wrong while creating the user.', 400);
        }
      }
    );
});

/*  "/:id"
 *    GET: find a user with the given id.
 *    DELETE: removes a user with the given id.
 */
router.get('/users/:id', permission(['admin']), function(req, res) {
  let id = req.params.id;
  User.findById(id)
    .then(
      (user) => {
        res.send(user);
      },
      (error) => {
        handleError(res, error.message, 'Failed to get user with id ' + id);
      }
    );
});

router.delete('/users/:id', permission(['admin']), function(req, res) {
  User.findByIdAndRemove(req.params.id)
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

/* "/current"
 *  GET: get the current logged in user
 */
router.get('/current_user', permission(), function(req, res) {
  return res.status(200).json(req.user);
});

/* "/change_password"
 *  UPDATE: changes the password of the current logged in user.
 *  @param: password: string
 */
router.put('/current_user/change_password', permission(), function(req, res) {
  req.user.resetPassword(req.body.password).then(() => {
    res.status(200).json();
  }, (error) => {
    handleError(res, error.message, 'Failed to change password');
  });
});

module.exports = router;
