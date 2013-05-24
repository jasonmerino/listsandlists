'use strict';

angular.module('listsandlistsApp')
  .controller('ListCtrl',
    ['$window', '$scope', '$routeParams', '$location',
      function ($window, $scope, $routeParams, $location) {

        // grab data from localStorage
        // TODO: write a better way to do this
        if ($window.localStorage.listData !== undefined) {
          $scope.lists = JSON.parse($window.localStorage.listData);
        }
        else {
          $scope.lists = [];
        }

        // store UI state within $scope
        $scope.ui = {
          showAddItem: false
        };

        // init scope variables
        $scope.newItem = '';

        // helper to get the current list for simpler access
        function getListById(id) {
          for (var i = 0; i < $scope.lists.length; i++) {
            if ($scope.lists[i].id === id) {
              return $scope.lists[i];
            }
          }
        }

        /**
         * Add the typed item to the list and persist it in localStorage
         */
        $scope.addItem = function () {
          if ($scope.newItem !== '') {
            $scope.list.itemList.push($scope.newItem);
            // persist
            $window.localStorage.listData = JSON.stringify($scope.lists);
            // adjust UI
            $scope.ui.showAddItem = false;
            $scope.newItem = '';
          }
        };

        /**
         * Show the UI for adding an item
         */
        $scope.showAddItemUI = function () {
          $scope.ui.showAddItem = true;
        };

        /**
         * Navigate the user back to the main menu (back arrow button)
         */
        $scope.navigateToMainView = function () {
          $location.path('/');
        };

        $scope.list = getListById(parseInt($routeParams.id, 10));
      }
    ]
  );
