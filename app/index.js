let App = require('./app');
let Database = require('./databases/mongodb');
let config = require('config');
let Server = require('./server');

let app = new App();
let database = new Database().connect(config.db.url);
database.then(() => {
    new Server().run(app.get(), config.server.port);
});
