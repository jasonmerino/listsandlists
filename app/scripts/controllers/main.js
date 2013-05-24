'use strict';

angular.module('listsandlistsApp')
  .controller('MainCtrl', ['$window', '$scope', '$location', function ($window, $scope, $location) {
    $scope.lists = $window.localStorage.listData !== undefined ? JSON.parse($window.localStorage.listData) : [];

    $scope.showAddListUI = false;
    $scope.newList = '';

    $scope.addList = function () {
      if ($scope.newList !== '') {
        // store in JS
        $scope.lists.push({
          id: 3,
          item: $scope.newList,
          itemList: [],
          status: null,
          total: 0
        });
        // persist
        $window.localStorage.listData = JSON.stringify($scope.lists);
        $scope.newList = '';
        $scope.showAddListUI = false;
      }
    };

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
