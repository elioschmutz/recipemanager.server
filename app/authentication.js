let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      user.validatePassword(password).then(
        () => {
          return done(null, user);
        }, () => {
          return done(null, false, {message: 'Incorrect password.'});
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
