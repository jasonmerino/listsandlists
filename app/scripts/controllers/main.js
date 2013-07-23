/* global app */

'use strict';

app.controller('MainCtrl', ['$window', '$scope', '$location', 'db', function ($window, $scope, $location, db) {

    /**
     * Pull data from localStorage provider
     * @type {Object}
     */
    $scope.data = db.pull();

    /**
     * setup UI 'model' stuff
     * @type {Boolean}
     */
    $scope.showAddListUI = false;
    $scope.newList = '';

    /**
     * When user clicks add button create a new list with default settings and persist
     */
    $scope.addList = function () {

      // check that user entered text
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

        // persist
        db.push($scope.data);

        // reset UI
        $scope.newList = '';
        $scope.showAddListUI = false;
      }
    };

    /**
     * When user clicks on a list show them the list items
     */
    $scope.navigateToList = function () {
      $location.path('/list/' + this.list.id);
    };

    /**
     * When user clicks the plus button to add a list show the UI for that and auto focus text box
     */
    $scope.showAddList = function () {
      $scope.showAddListUI = true;

      // set a delay here to make async
      setTimeout(function () {
        document.getElementById('list-to-add').focus();
      }, 10);
    };
  }]);
