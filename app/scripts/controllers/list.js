'use strict';

angular.module('listsandlistsApp')
  .controller('ListCtrl',
    ['$window', '$scope', '$routeParams', '$location', 'db',
      function ($window, $scope, $routeParams, $location, db) {

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
         * Grab data from localStorage
         * @type {Object}
         */
        $scope.data = db.pull();

        /**
         * Store UI state within $scope
         * @type {Object}
         */
        $scope.ui = {
          showAddItem: false
        };

        /**
         * Set value of new item text input
         * @type {String}
         */
        $scope.newItem = '';

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
            // persist
            db.push($scope.data);
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

          // make focus 'async'
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
         * @param {Number} index The index of the item to remove
         */
        $scope.removeItem = function (index) {
          // remove the item from the listItem array
          $scope.list.itemList.splice(index, 1);
          // persist
          db.push($scope.data);
        };

        /**
         * Create scoped pointer to the active list for easier access
         * @type {Object}
         */
        $scope.list = getListById(parseInt($routeParams.id, 10));
      }
    ]
  );