let User = require('../app/models/user');
let Recipe = require('../app/models/recipe');
let config = require('config');
let _ = require('lodash');

module.exports.user = (properties) => {
    return new User(properties).save();
};


module.exports.recipe = (properties) => {
    let fallbackProps = {'_creator': config.testusers.member._id};
    properties = _.extend(fallbackProps, properties);

    return new Recipe(properties).save();
};
