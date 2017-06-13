let express = require('express');
let bodyParser = require('body-parser');

/**
*/
class App {

    /**
    */
    constructor() {
      this.app = express();

      // Helmet helps you secure your Express apps by setting various HTTP headers.
      this.app.use(require('helmet')());

      // parse application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({extended: false}));

      // parse application/json
      this.app.use(bodyParser.json());

      this.app.use(require('./controllers'));
    }
    /**
     */
    get() {
      return this.app;
    }
  }

module.exports = App;
