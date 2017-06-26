let config = require('config');
let db = require('../app/databases/mongodb');
let app = require('../app/app');
let chaiHttp = require('chai-http');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let suite = require('./suite');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

before(function() {
  return db.connect(config.db.url).then(() => {
    return app.bootstrap();
    });
});

beforeEach(function() {
    return suite.setUpDatabase();
});

afterEach(function() {
    return suite.tearDownDatabase();
});
