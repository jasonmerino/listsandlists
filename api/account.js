var mongoose = require('mongoose'),
  appUtils = require('../utils');

var Account = (function () {
  'use strict';

  var schemas = {
    user: mongoose.Schema({
      //id: Number,
      username: String,
      password: String
    })
  };

  function setHeaders (res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }

  return {

    register: function (req, res) {

      setHeaders(res);

      // require post for new user creation
      if (req.route.method === 'post') {
        console.log(req.protocol);
        // create user schema
        var User = mongoose.model('user', schemas.user),
          response = {},
          un = req.body.username,
          pw = req.body.password;

        // query database for existing user
        User.find({ username: un }, function (error, usr) {
          if (error) {
            throw error;
          }

          // if no user was found
          if (usr.length === 0) {
            var user = new User({
              username: un,
              password: appUtils.hashPassword(pw)
            });
            // save user to db
            user.save(function (error, user) {
              // setup response object
              response.status = error ? 'error' : 'success';
              response.data = user;
              // send response
              res.send(response);
            });
          }
          // if 1 or more users was found
          else {
            res.send({
              status: 'error',
              message: 'User already exists.'
            });
          }
        });
      }
      else {
        res.status(403); // forbidden
        res.send();
      }
    },

    getUsers: function (req, res) {

      setHeaders(res);

      var User = mongoose.model('user', schemas.user)
      User.find({}, function (error, usr) {
        res.json(usr);

      });

    }

  };

}());


module.exports = Account;