'use strict';

angular.module('listsandlistsApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.lists = [
      {
        id: 0,
        item: 'Home Depot',
        status: null,
        total: 13
      },
      {
        id: 1,
        item: 'Food Maxx',
        status: null,
        total: 7
      },
      {
        id: 2,
        item: 'Raley\'s',
        status: null,
        total: 10
      }
    ];
    $scope.getListCount = function () {
      return $scope.lists.length;
    };
    $scope.navigateToList = function () {
      $location.path('/list/' + this.list.id);
    };
    $scope.addList = function () {
      alert('add list');
    };
  }]);
