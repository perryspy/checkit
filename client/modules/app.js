var app = angular.module('checkit',
  ['ngResource', 'ui.router']);

app.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    var defaultRoute = 'checkit';

    $stateProvider
      .state('checkit', {
        url: '/checkit',
        templateUrl: 'modules/note/templates/checkit.html',
        controller: 'CheckitCtrl'
      });

    $urlRouterProvider.otherwise(defaultRoute);
  }
]);
