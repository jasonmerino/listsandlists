
var Router = function () {
	'use strict';

	return {
		registerRoutes: function (routes, app) {
			// Add handlers for the app (from the routes).
			for (var r in routes) {
				if (typeof routes[r] === 'object') {
					var options = routes[r],
						verbs = options.verbs || ['all'],
						controller = require('./api/' + options.controller),
						args = [r, controller[options.action]];
					if (options.middleware) {
						args.splice(1, 0, options.middleware);
					}
					for (var i = 0; i < verbs.length; i++) {
						app[verbs[i]].apply(app, args);
					}
				}
				else if (typeof routes[r] === 'function') {
					app.all(r, routes[r]);
				}
			}
		}
	};
};

module.exports = new Router();