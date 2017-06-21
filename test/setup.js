let config = require('config');
let env = require('./env');
let chaiHttp = require('chai-http');
let chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

// Starts a local mongodb to test against.
before(require('mongodb-runner/mocha/before'));

before(function() {
  return env.db.connect(config.db.url).then(() => {
    return env.app.bootstrap();
    });
});

// Shuts down the local mongodb.
after(require('mongodb-runner/mocha/after'));
