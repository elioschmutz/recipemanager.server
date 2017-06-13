let Database = require('../app/databases/mongodb');
let App = require('../app/app');

db = module.exports.db = new Database();
app = module.exports.app = new App();
