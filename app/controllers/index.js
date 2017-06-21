let Router = require('express').Router;
let recipeController = require('./recipes');
let usersController = require('./users');
let authenticationController = require('./authentication');
let router = new Router();

router.use('/authentication', authenticationController);
router.use('/api/recipes', recipeController);
router.use('/api/users', usersController);


module.exports = router;

