let config = require('config');
let env = require('./env');
let chaiHttp = require('chai-http');
let chai = require('chai');

chai.use(chaiHttp);

before(require('mongodb-runner/mocha/before'));

before(function() {
  return env.db.connect(config.db.url);
});

after(require('mongodb-runner/mocha/after'));
