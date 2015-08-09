var passport = require('passport');
var User = require('../models/user');

var jwt = require('express-jwt');
var tokenSecret = 'Secret';

var _ = require('lodash');

exports.register = function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fileds'
    });
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      return next(err);
    }

    return res.json({
      token: user.generateJWT()
    });
  });
};

exports.login = function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fileds'
    });
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({
        token: user.generateJWT()
      })
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
};

exports.auth = jwt({
  secret: tokenSecret,
  userProperty: 'payload'
});
