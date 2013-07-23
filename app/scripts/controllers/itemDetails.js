/* global app */

'use strict';

app.controller(
  'ItemDetailsCtrl',
  ['$scope', '$routeParams', 'db', '$location',
  function ($scope, $routeParams, db, $location) {

  var data = db.pull();

  $scope.findIndexFromId = function (arr, id) {
    var index;
    angular.forEach(arr, function (list, key) {
      if (list.id === id.toInt()) {
        index = key;
      }
    });
    return index;
  };

  var listIndex = $scope.findIndexFromId(data.lists, $routeParams.listId);
  var itemIndex = $scope.findIndexFromId(data.lists[listIndex].itemList, $routeParams.itemId);

  $scope.data = data.lists[listIndex].itemList[itemIndex];

  $scope.backToItem = function () {
    // persist changes
    data.lists[listIndex].itemList[itemIndex] = $scope.data;
    db.push(data);
    // move back to list
    $location.path('/list/' + listIndex);
  };



}]);