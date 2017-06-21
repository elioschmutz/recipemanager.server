// let flash = require('connect-flash');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let db = require('./databases/mongodb');
let config = require('config');


/**
 * App-Class for configuring the express-framework
 */
class App {

    /**
     * Sets up your express-framework.
     */
    bootstrap() {
      this.app = express();

      // Helmet helps you secure your Express apps by setting
      // various HTTP headers.
      this.app.use(require('helmet')());

      // parses cookies into req.cookies
      this.app.use(cookieParser());

      // Sessions are stored within the mongodb. The cookie only stores the
      // session-id
      this.app.use(session({
        secret: config.sessions.secret,
        store: new MongoStore({
          mongooseConnection: db.db.connection}),
        resave: true,
        saveUninitialized: true,
      }));

      // // Messages are written to the flash and cleared after being displayed to the user.
      // this.app.use(flash());

      // parse application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({extended: false}));

      // parse application/json
      this.app.use(bodyParser.json());

      // Responsible for authentication
      this.app.use(passport.initialize());
      this.app.use(passport.session());

      // Load all controllers
      this.app.use(require('./controllers'));
    }
    /**
     * Initializes an empty app. Run bootstrap to set-up your express instance.
     */
    constructor() {
      this.app = null;
    }
    /**
     * Returns the express-app instance
     * @return {Express-App}
     */
    get() {
      return this.app;
    }
  }

module.exports = App;
