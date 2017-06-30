let config = require('config');
let builder = require('./builder');
let _ = require('lodash');
let User = require('../app/models/user');
let chai = require('chai');
let app = require('../app/app');

/**
  *  Creates init content for testing
  */
module.exports.setUpDatabase = () => {
    // Create testusers
    users = [];
    _.forIn(config.testusers, (properties, user) => {
        users.push(builder.user(properties));
    });
    return Promise.all(users);
};

/**
  * Clears everything everything within the databsase
  */
module.exports.tearDownDatabase = () => {
    return User.remove({});
};

module.exports.login = (agent, user) => {
    if (user == null) {
        user = config.testusers.member;
    }
    return agent
      .post('/authentication/login')
      .send({
        username: user.username,
        password: user.password});
};
