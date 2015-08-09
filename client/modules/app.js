var app = angular.module('checkit',
  ['ui.router', 'note']);

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
