'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.homeView',
  'myApp.courseView',
  'myApp.searchView',
  'myApp.navbar',
  'myApp.loginView',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: 'views/homeView/homeView.html',
    controller: 'homeViewCtrl'
  })

  .when('/course/:abbr', {
    templateUrl: 'views/courseView/courseView.html',
    controller: 'courseViewCtrl'
  })

  .when('/search', {
    templateUrl: 'views/searchView/searchView.html',
    controller: 'searchViewCtrl'
  })
  .when('/search/:query', {
    templateUrl: 'views/searchView/searchView.html',
    controller: 'searchViewCtrl'
  })

  .when('/login', {
    templateUrl: 'views/loginView/loginView.html',
    controller: 'loginViewCtrl'
  })

  .when('/profile', {
    templateUrl: 'views/profileView/profileView.html',
    controller: 'profileViewCtrl'
  })
  .otherwise({redirectTo: '/'});
}])
.constant('apiServer', 'http://192.168.59.103:3000');
