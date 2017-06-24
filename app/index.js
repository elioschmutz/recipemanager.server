let app = require('./app');
let database = require('./databases/mongodb');
let authentication = require('./authentication');
let config = require('config');
let Server = require('./server');

let db = database.connect(config.db.url);
db.then(() => {
    app.bootstrap();
    new Server().run(app.get(), config.server.port);
});
