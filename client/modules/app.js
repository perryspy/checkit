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
      });

    $urlRouterProvider.otherwise(defaultRoute);
  }
]);
