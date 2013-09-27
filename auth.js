var request = require('request');

var Auth = function () {
	'use strict';

	return {
		login: function(username, password, done) {
			request.post(
				{
					url: 'http://localhost:8080/api/login',
					data: {
						username: username,
						password: password
					}
				},
				function (error, res, user) {
					console.log('auth');
					if (error) {
						return done(error);
					}
					if (res.statusCode === 401) {
						return done(null, false);
					}
					return done(null, user);
				}
			);

			// User.findOne({ username: username }, function(err, user) {
			// 	if (!user) {
			// 		return done(null, false, { message: 'Incorrect username.' });
			// 	}
			// 	if (!user.validPassword(password)) {
			// 		return done(null, false, { message: 'Incorrect password.' });
			// 	}
			// 	return done(null, user);
			// });
			// done();
		}
	};
};

module.exports = new Auth();