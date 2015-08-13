var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.isValidPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

// Should probably set this as an environment variable
var tokenSecret = 'SECRET';

UserSchema.methods.generateJWT = function () {
  // set expiration to 60 days
  var exp = new Date();
  exp.setDate(exp.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username
  }, config.appSecret, {
    expiresInMinutes: 4320  // expires in 3 days
  });
};

module.exports = mongoose.model('User', UserSchema);
