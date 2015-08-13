var app = angular.module('checkit',
  ['ui.router', 'note', 'auth']);

app.config([
  '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    var defaultRoute = 'login';

    $stateProvider
      .state('checkit', {
        url: '/checkit',
        templateUrl: 'modules/note/templates/checkit.html',
        controller: 'CheckitCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/user/templates/login.html',
        controller: 'MainController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'modules/user/templates/register.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise(defaultRoute);

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);

app.controller('MainController', [
  '$scope', '$state', 'AuthService',
  function($scope, $state, AuthService) {
    $scope.user = {};

    $scope.register = function() {
      AuthService.register($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('checkit');
        });
    };

    $scope.logIn = function() {
      AuthService.logIn($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('checkit');
        });
    };

    $scope.logOut = function() {
      AuthService.logOut();
    };

    $scope.isLoggedIn = function() {
      return AuthService.isLoggedIn();
    };
  }
]);
