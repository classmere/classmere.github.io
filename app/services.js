'use strict';

angular.module('myApp.authentication', ['ngResource, ngRoute'])

.factory('authenticationService', function () {
  function checkLoggedIn($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user){
      if (user !== '0')
        deferred.resolve();

      else {
        $rootScope.message = 'You need to log in.';
        deferred.reject();
        $location.url('/login');
      }
    });

    return deferred.promise;
  }

  return checkLoggedIn;
});