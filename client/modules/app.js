var app = angular.module('checkit',
  ['ui.router', 'note', 'auth']);

app.config([
  '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    var defaultRoute = 'checkit';

    $stateProvider
      .state('checkit', {
        url: '/checkit',
        templateUrl: 'modules/note/templates/checkit.html',
        controller: 'CheckitCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/auth/templates/login.html',
        controller: 'MainController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'modules/auth/templates/register.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise(defaultRoute);

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);

app.controller('MainController', [
  '$scope', '$state', '$location', 'AuthService',
  function($scope, $state, $location, AuthService) {
    $scope.user = {};

    _init();
    function _init() {
      // Checked if logged in, if not register guest
      if (!AuthService.isLoggedIn() && !AuthService.isGuest()) {
        AuthService.registerGuest()
          .error(function(error) {
            $scope.error = error;
          })
          .then(function() {
          });
      }
    }

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
      $state.go('login');
    };

    $scope.isLoggedIn = function() {
      return AuthService.isLoggedIn();
    };

    $scope.go = function(path) {
      $location.path(path);
    };
  }
]);
