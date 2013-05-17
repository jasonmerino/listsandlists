'use strict';

angular.module('listsandlistsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.lists = [
      {
        item: 'Home Depot',
        status: null,
        total: 13
      },
      {
        item: 'Food Maxx',
        status: null,
        total: 7
      },
      {
        item: 'Raley\'s',
        status: null,
        total: 10
      }
    ];
    $scope.getListCount = function () {
      return $scope.lists.length;
    };
    $scope.navigateToList = function () {
      alert('nav to ' + this.list.item);
    };
    $scope.addList = function () {
      alert('add list');
    };
  }]);
