var module = angular.module('user', ['ui.router']);

app.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
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
  }
]);
