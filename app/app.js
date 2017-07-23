// let flash = require('connect-flash');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let db = require('./databases/mongodb');
let config = require('config');
let authentication = require('./authentication');

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

      this.app.use(function(req, res, next) {
       // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Origin, Accept, Cookie');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Website you wish to allow to connect
        res.header('Access-Control-Allow-Origin', config.server.access_control.allow_origin);

        next();
      });

      // Sessions are stored within the mongodb. The cookie only stores the
      // session-id
      let expires = new Date();
      expires.setMonth(expires.getMonth() + 1);
      this.app.use(session({
        name: '__rmac',
        secret: config.sessions.secret,
        resave: false,
        store: new MongoStore({
          mongooseConnection: db.db.connection}),
        saveUninitialized: true,
        cookie: {
          path: '/',
          httpOnly: config.sessions.httpOnly,
          maxAge: 1000 * 60 * 60 * 24 * 30,
          secure: config.sessions.secure,
        },
      }));

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

module.exports = new App();
