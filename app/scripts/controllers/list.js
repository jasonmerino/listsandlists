'use strict';

angular.module('listsandlistsApp')
  .controller('ListCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
    var lists = [
      {
        id: 0,
        name: 'homedepot',
        items: ['coarse vermiculite', 'compost', 'hydrangea']
      },
      {
        id: 1,
        name: 'foodmaxx',
        items: ['tomatoes', 'strawberries', 'cereal', 'garlic salt']
      },
      {
        id: 2,
        name: 'raleys',
        items: ['oranges', 'coconut milk']
      }
    ];

    function getListById(id) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === id) {
          return lists[i];
        }
      }
    }

    $scope.navigateToMainView = function () {
      $location.path('/');
    };

    $scope.list = getListById(parseInt($routeParams.id, 10));
  }]);
