let database = require('../app/databases/mongodb');
let App = require('../app/app');

module.exports.db = database;
module.exports.app = new App();
