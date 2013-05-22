'use strict';

angular.module('listsandlistsApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.lists = [
      {
        id: 0,
        item: 'Home Depot',
        status: null,
        total: 3
      },
      {
        id: 1,
        item: 'Food Maxx',
        status: null,
        total: 4
      },
      {
        id: 2,
        item: 'Raley\'s',
        status: null,
        total: 2
      }
    ];

    $scope.showAddListUI = false;

    $scope.getListCount = function () {
      return $scope.lists.length;
    };
    $scope.navigateToList = function () {
      $location.path('/list/' + this.list.id);
    };
    $scope.showAddList = function () {
      $scope.showAddListUI = true;
      //alert('add list');
    };
  }]);
