const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users')

// JWT
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// strategy to login
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }).lean().exec(function(err, user){
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!User.validPassword(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// strategy to protect private API
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.JWT_SECRET
}, function(jwtPayload, cb) {
  //find the user in db if needed
  console.log('JWTStrategy: jwtPayload: ' + JSON.stringify(jwtPayload))
  return User.findOne({username: jwtPayload.username})
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
}
));

module.exports = passport;