var module = angular.module('user');

module.factory('UserService', [
  '$http', 'AuthTokenService',
  function($http, AuthTokenService) {
    var service = {};

    service.isLoggedIn = function(token) {
      // if they don't pass in a token, find it
      // might do double look ups if a token is undefined to begin with
      if (token === undefined) {
        token = AuthTokenService.getToken();
      }

      if (token) {
        var payload = AuthTokenService.getPayload(token);

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
        var payload = AuthTokenService.getPayload(token);

        return payload.username;
      }
    };

    service.register = function(user) {
      return $http.post('/api/register', user)
        .success(function(response) {
          AuthTokenService.setToken(response.token);
        });
    };

    service.logIn = function(user) {
      return $http.post('/api/login', user)
        .success(function(response) {
          AuthTokenService.setToken(response.token);
        });
    };

    service.logOut = function() {
      AuthTokenService.setToken();
    };

    return service;
  }
]);
