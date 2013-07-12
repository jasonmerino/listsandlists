'use strict';

angular.module('listsandlistsApp').controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'db', function ($scope, $routeParams, db) {

  var data = db.pull();

  $scope.findIndexFromId = function (arr, id) {
    var index;
    angular.forEach(arr, function (list, key) {
      if (list.id === ~~id) { index = key; }
    });
    return index;
  };

  var listIndex = $scope.findIndexFromId(data.lists, $routeParams.listId);
  var itemIndex = $scope.findIndexFromId(data.lists[listIndex].itemList, $routeParams.itemId);

  $scope.data = data.lists[listIndex].itemList[itemIndex];
}]);