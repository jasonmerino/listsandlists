'use strict';

angular.module('listsandlistsApp')
  .controller('MainCtrl', ['$window', '$scope', '$location', function ($window, $scope, $location) {

    // grab data from localStorage
    // TODO: write a better way to do this
    if ($window.localStorage.listData !== undefined) {
      $scope.data = JSON.parse($window.localStorage.listData);
    }
    else {
      $scope.data = {
        lists: [],
        lastListId: -1
      };
    }

    $scope.showAddListUI = false;
    $scope.newList = '';

    var persist = function () {
      $window.localStorage.listData = JSON.stringify($scope.data);
    };

    $scope.addList = function () {
      if ($scope.newList !== '') {
        // store in JS

        $scope.data.lists.push({
          id: $scope.data.lastListId + 1,
          item: $scope.newList,
          lastItemId: -1,
          itemList: [],
          status: null,
          total: 0
        });
        $scope.data.lastListId++;
        persist();
        $scope.newList = '';
        $scope.showAddListUI = false;
      }
    };

    $scope.navigateToList = function () {
      $location.path('/list/' + this.list.id);
    };

    $scope.showAddList = function () {
      $scope.showAddListUI = true;
      setTimeout(function () {
        document.getElementById('list-to-add').focus();
      }, 10);
    };
  }]);
