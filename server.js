#!/bin/env node
//  OpenShift sample Node application
var mongoose = require('mongoose'),
  express = require('express'),
  fs      = require('fs'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  auth = require('./auth'),
  account = require('./api/account'),
  router = require('./router');

/**
 *  Define listsandlists application.
 */
var LandL = function() {
  'use strict';
  //  Scope.
  var self = this;

  /*  ================================================================  */
  /*  Helper functions.                                                 */
  /*  ================================================================  */

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  self.setupVariables = function() {
    //  Set the environment variables we need.
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    self.dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST;
    self.dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
    self.isLocal = false;

    if (typeof self.ipaddress === 'undefined') {
      //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
      //  allows us to run/test the app locally.
      console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
      self.ipaddress = '127.0.0.1';
      self.dbHost = '127.0.0.1';
      self.isLocal = true;
    }
  };

  /**
   *  Populate the cache.
   */
  self.populateCache = function() {
    if (typeof self.zcache === 'undefined') {
      self.zcache = { 'index.html': '' };
    }

    //  Local cache for static content.
    self.zcache['index.html'] = fs.readFileSync('./index.html');
  };

  /**
   *  Retrieve entry (content) from cache.
   *  @param {string} key  Key identifying content to retrieve from cache.
   */
  self.cacheGet = function(key) { return self.zcache[key]; };


  /**
   *  terminator === the termination handler
   *  Terminate server on receipt of the specified signal.
   *  @param {string} sig  Signal to terminate on.
   */
  self.terminator = function(sig){
    if (typeof sig === 'string') {
      console.log('%s: Received %s - terminating sample app ...',
        Date(Date.now()), sig);
      process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()) );
  };


  /**
   *  Setup termination handlers (for exit and a list of signals).
   */
  self.setupTerminationHandlers = function(){
    //  Process on exit and signals.
    process.on('exit', function() { self.terminator(); });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element) {
      process.on(element, function() {
        self.terminator(element);
      });
    });
  };


  /*  ================================================================  */
  /*  App server functions (main app logic here).                       */
  /*  ================================================================  */

  /**
   *  Create the routing table entries + handlers for the application.
   */
  self.createRoutes = function() {
    self.routes = { };

    // View routes
    self.routes['/health'] = function(req, res) {
      res.send('1');
    };

    self.routes['/asciimo'] = function(req, res) {
      var link = 'http://i.imgur.com/kmbjB.png';
      res.send('<html><body><img src="' + link + '"></body></html>');
    };


    self.routes['/'] = function(req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.send(self.cacheGet('index.html'));
    };

    // API routes
    self.routes['/api/user/register'] = {
      controller: 'account',
      action: 'register',
      verbs: ['post']
    };
    self.routes['/api/users'] = {
      controller: 'account',
      action: 'getUsers'
    };
    self.routes['/api/user/:id'] = {
      controller: 'account',
      action: 'getUser'
    };
    self.routes['/api/login/auth'] = {
      controller: 'account',
      action: 'login',
      verbs: ['post'],
      middleware: passport.authenticate('local')
    };
  };


  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  self.initializeServer = function() {
    self.createRoutes();
    self.app = express();
    self.app.use(express.static(__dirname + '/app'));
    self.app.use(express.cookieParser());
    self.app.use(express.bodyParser());

    self.app.use(express.session({
      secret: 'this is a secret'
    }));


    // use passport
    self.app.use(passport.initialize());
    self.app.use(passport.session());
    passport.use(new LocalStrategy(auth.login));
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      // console.log("USER: ", obj);
      done(null, obj);
    });

    // register all the routes
    router.registerRoutes(self.routes, self.app);
  };

  self.initializeDb = function () {
    var mongoPath = 'mongodb://' + self.dbHost + ':' + self.dbPort;
    mongoose.connect(mongoPath);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
      console.log('Node server connected to mongo db at ' + mongoPath);
    });
  };

  /**
   *  Initializes the sample application.
   */
  self.initialize = function() {
    self.setupVariables();
    self.populateCache();
    if (!self.isLocal) {
      self.setupTerminationHandlers();
    }

    // Create the express server and routes.
    self.initializeDb();
    self.initializeServer();
  };


  /**
   *  Start the server (starts up the sample application).
   */
  self.start = function() {
    //  Start the app on the specific interface (and port).
    self.app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
            Date(Date.now() ), self.ipaddress, self.port);
    });
  };

};



/**
 *  main():  Main code.
 */
var zapp = new LandL();
zapp.initialize();
zapp.start();

