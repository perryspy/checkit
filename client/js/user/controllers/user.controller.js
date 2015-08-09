var module = angular.module('user', []);

module.controller('UserController', [
  '$scope', '$state', 'UserService',
  function($scope, $state, UserService) {
    $scope.user = {};

    $scope.register = function() {
      UserService.register($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('checkit');
        });
    };

    $scope.logIn = function() {
      UserService.logIn($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('checkit')
        });
    };
  }
]);
