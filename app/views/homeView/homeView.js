'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngResource'])

.controller('homeViewCtrl', ['$scope', '$resource', '$location', 'apiServer',
  function($scope, $resource, $location, apiServer) {
  var courses = $resource(apiServer + '/courses');
  $scope.courses = courses.query();

  $scope.search = function () {
    $location.path('/search');
    $location.search('q', $scope.searchTerm);
  };
}]);