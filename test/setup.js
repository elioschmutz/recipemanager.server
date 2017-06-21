let config = require('config');
let env = require('./env');
let chaiHttp = require('chai-http');
let chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

before(function() {
  return env.db.connect(config.db.url).then(() => {
    return env.app.bootstrap();
    });
});
