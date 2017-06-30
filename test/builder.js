let User = require('../app/models/user');
let Recipe = require('../app/models/recipe');
let config = require('config');

module.exports.user = (properties) => {
    return new User(properties).save().then((user) => {
        return user;
    });
};


module.exports.recipe = (properties, creatorByUsername) => {
    return new Recipe(properties).save().then((recipe) => {
        if (creatorByUsername == null) {
            creatorByUsername = config.testusers.member.username;
        }
        return recipe.setCreatorByUserName(creatorByUsername);
    });
}
