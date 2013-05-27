'use strict';

angular.module('listsandlistsApp')
  .controller('ListCtrl',
    ['$window', '$scope', '$routeParams', '$location',
      function ($window, $scope, $routeParams, $location) {

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

        // store UI state within $scope
        $scope.ui = {
          showAddItem: false
        };

        // init scope variables
        $scope.newItem = '';

        /**
         * Helper function to get the current list for simpler access
         * @param  {Number} id
         * @return {Object}
         */
        function getListById(id) {
          for (var i = 0; i < $scope.data.lists.length; i++) {
            if ($scope.data.lists[i].id === id) {
              return $scope.data.lists[i];
            }
          }
        }

        /**
         * Persist the JS data to localStorage
         */
        var persist = function () {
          $window.localStorage.listData = JSON.stringify($scope.data);
        };

        /**
         * Add the typed item to the list and persist it in localStorage
         */
        $scope.addItem = function () {
          if ($scope.newItem !== '') {
            var item = {
              id: $scope.list.lastItemId + 1,
              item: $scope.newItem
            };
            $scope.list.lastItemId++;
            $scope.list.itemList.push(item);
            persist();
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
          setTimeout(function () {
            document.getElementById('new-item').focus();
          }, 10);
        };

        /**
         * Navigate the user back to the main menu (back arrow button)
         */
        $scope.navigateToMainView = function () {
          $location.path('/');
        };

        /**
         * Remove the clicked item from the current list
         */
        $scope.removeItem = function () {
          for (var i = 0; i < $scope.list.itemList.length; i++) {
            if ($scope.list.itemList[i].id === this.listItem.id) {
              // remove the item from the listItem array
              $scope.list.itemList.splice(i, 1);
            }
          }
          persist();
        };

        // create scoped pointer to the active list
        $scope.list = getListById(parseInt($routeParams.id, 10));
      }
    ]
  );
