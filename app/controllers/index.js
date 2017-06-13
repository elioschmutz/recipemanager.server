let Router = require('express').Router;
let recipeController = require('./recipes');

let router = new Router();

router.use('/api/recipes', recipeController);

module.exports = router;

