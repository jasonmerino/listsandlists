/* global FastClick */

'use strict';

/**
 * Add FastClick to the page to make more responsive on mobile touch devices
 */
window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

/**
 * Configure routes and controller associations for the lists and lists module
 */
angular.module('listsandlistsApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
    $routeProvider
      .when('/list/:listId/:itemId', {
        templateUrl: 'views/item-details.html',
        controller: 'ItemDetailsCtrl'
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

/**
 * Add a provider to the lists and lists module for 'global' persistence
 */
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