'use strict';

angular.module('myApp.loginView', ['ngRoute', 'ngResource'])

.controller('loginViewCtrl', ['$scope', '$resource', '$location', 'apiServer',
  function($scope, $resource, $location, apiServer) {

  $scope.verified = {};
  $scope.verified.email = false;
  $scope.verified.password = false;
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.email = '';
  $scope.password = '';
  // Determines whether to show login or sign-up view
  $scope.login = true;

  var emailRegex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  $scope.$watch('email', function () {
    var email = String($scope.email);
    $scope.verified.email = email.match(emailRegex) ? true : false;
  });
  $scope.$watch('password', function () {
    var password = String($scope.password);
    $scope.verified.password = password.length > 5 ? true : false;
  });

  $scope.signup = function() {
    if ($scope.verified.email && $scope.verified.password) {
      var User = $resource(apiServer + '/users/signup');
      var user = User.save({ first_name: $scope.firstName,
                             last_name: $scope.lastName,
                             email: $scope.email, 
                             password: $scope.password 
      });
    }
  };

  $scope.login = function() {
    if ($scope.verified.email && $scope.verified.password) {
      var User = $resource(apiServer + '/users/login');
      var user = User.save({ email: $scope.email,
                             password: $scope.password
      }, function () {
        $location.path('/');
      }, function () {
        $location.path('/login');
      });
    }
  };
}]);
