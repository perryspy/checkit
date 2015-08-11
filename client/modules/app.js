var app = angular.module('checkit',
  ['ui.router', 'note', 'user']);

app.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
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
        controller: 'UserController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'modules/user/templates/register.html',
        controller: 'UserController'
      });

    $urlRouterProvider.otherwise(defaultRoute);
  }
]);
