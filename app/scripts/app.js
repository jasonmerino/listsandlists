/* global FastClick */

'use strict';

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

angular.module('listsandlistsApp')
  .provider('db', function() {
      this.$get = function () {
        var data;
        if (window.localStorage.listData !== undefined) {
          data = JSON.parse(window.localStorage.listData);
        }
        else {
          data = {
            lists: [],
            lastListId: -1
          };
        }
        return {
          pull: function () {
            return data;
          },
          push: function (data) {
            window.localStorage.listData = JSON.stringify(data);
          }

        };
      };
    });