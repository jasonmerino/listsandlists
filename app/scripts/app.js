/* global FastClick, $ */

'use strict';

window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

$(document).on('touchmove',function(e){
  e.preventDefault();
});

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
