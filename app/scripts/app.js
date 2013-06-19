/* global FastClick */

'use strict';

// var myScroll;
// var loaded = function() {
//   myScroll = new IScroll('#wrapper', { mouseWheel: true });
// };

// setTimeout(loaded, 3000);

window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

angular.module('listsandlistsApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
    $routeProvider
      .when('/list/:id', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
