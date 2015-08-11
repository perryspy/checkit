var module = angular.module('user');

module.factory('UserService', [
  '$http', '$window',
  function($http, $window) {
    var service = {};

    service.storageKey = 'checkit';

    service.saveToken = function(token) {
      $window.localStorage[service.storageKey] = token;
    };

    service.getToken = function() {
      return $window.localStorage[service.storageKey];
    };

    function getPayload(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    service.isLoggedIn = function(token) {
      // if they don't pass in a token, find it
      // might do double look ups if a token is undefined to begin with
      if (token === undefined) {
        token = service.getToken();
      }

      if (token) {
        var payload = getPayload(token);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    service.currentUser = function() {
      var token = auth.getToken();

      if (auth.isLoggedIn(token)) {
        var payload = getPayload(token);

        return payload.username;
      }
    };

    service.register = function(user) {
      return $http.post('/api/register', user)
        .success(function(response) {
          service.saveToken(response.token);
        });
    };

    service.logIn = function(user) {
      return $http.post('/api/login', user)
        .success(function(response) {
          service.saveToken(response.token);
        });
    };

    service.logOut = function() {
      $window.localStorage.removeItem(service.storageKey);
    };

    return service;
  }
]);
