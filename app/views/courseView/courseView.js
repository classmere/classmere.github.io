'use strict';

angular.module('myApp.courseView', ['ngRoute'])

.controller('courseViewCtrl', [
  '$scope', '$resource', '$routeParams', 'apiServer',
  function($scope, $resource, $routeParams, apiServer) {
  var course = $resource(apiServer + '/courses/:abbr',
    { abbr: $routeParams.abbr });
  $scope.course = course.get();
}]);
