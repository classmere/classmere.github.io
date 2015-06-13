'use strict';

angular.module('myApp.searchView', ['ngRoute', 'ngResource'])

.controller('searchViewCtrl', ['$scope', '$resource', '$routeParams', 'apiServer',
  function($scope, $resource, $routeParams, apiServer) {

  var searchResults = $resource(apiServer + '/search/courses/:q',
    { q: $routeParams.q });
  $scope.searchResults = searchResults.query();
}]);