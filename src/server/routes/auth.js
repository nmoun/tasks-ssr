const router = require('express').Router();
const User = require('../models/users')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')

router.post('/register', function(req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    return res.status(400).json({
      message: 'Passwords do not match.'
    });
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    User.create(userData, function(error) {
      if (error) {
        return next(error);
      } else {
        // req.session.userId = user._id;
        res.json({ status: 'ok' })
      }
    });
  }
});

router.post('/login', function(req, res, next){

  if(!req.body.username || !req.body.password){
    return res.status(400).json({
      message: 'Mandatory credentials',
    });
  }

  passport.authenticate('local', { session: false }, (err, user) => {
    // custom callback to handle authentication
    if (err || !user) {
      return res.status(400).json({
        message: 'Wrong credentials'
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(400).json({
          message: 'Wrong credentials',
        });
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '2h'});
      logger(req, res, '/login: success, token: ' + token)
      return res.json({ user, token });
    });
  })(req, res, next);
})

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  next();
}, (req, res) => {
  req.logout();
  res.redirect('/')
})

module.exports = router