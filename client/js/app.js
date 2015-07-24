var app = angular.module('checkit', ['ngResource', 'ui.router']);

app.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    var defaultRoute = 'checkit';

    $stateProvider
      .state('checkit', {
        url: '/checkit',
        templateUrl: 'partials/checkit.html',
        controller: 'CheckitCtrl'
      })
    ;

    $urlRouterProvider.otherwise(defaultRoute);
  }
]);
