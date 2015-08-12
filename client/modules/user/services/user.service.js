var module = angular.module('user');

module.factory('UserService', [
  '$http', 'AuthTokenService',
  function($http, AuthTokenService) {
    var service = {};

    function getPayload(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    service.isLoggedIn = function(token) {
      // if they don't pass in a token, find it
      // might do double look ups if a token is undefined to begin with
      if (token === undefined) {
        token = AuthTokenService.getToken();
      }

      if (token) {
        var payload = getPayload(token);

        if (payload.exp > Date.now() / 1000) {
          return true;
        } else {
          // the token has expired, remove it
          AuthTokenServices.setToken();

          return false;
        }
      } else {
        return false;
      }
    };

    service.currentUser = function() {
      var token = AuthTokenService.getToken();

      if (auth.isLoggedIn(token)) {
        var payload = getPayload(token);

        return payload.username;
      }
    };

    service.register = function(user) {
      return $http.post('/api/register', user)
        .success(function(response) {
          AuthTokenService.saveToken(response.token);
        });
    };

    service.logIn = function(user) {
      return $http.post('/api/login', user)
        .success(function(response) {
          AuthTokenService.saveToken(response.token);
        });
    };

    service.logOut = function() {
      AuthTokenServices.setToken();
    };

    return service;
  }
]);
