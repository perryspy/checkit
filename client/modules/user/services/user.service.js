var module = angular.module('user');

module.factory('UserService', [
  '$http', '$window',
  function($http, $window) {
    var service = {};

    service.storageKey = 'checkit';

    service.saveToken = function(token) {
      $window.localStorage[storageKey] = token;
    };

    service.getToken = function() {
      return $window.localStorage[storageKey];
    };

    function getPayload(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    service.isLoggedIn = function(token) {
      // if they don't pass in a token, find it
      // might do double look ups if a token is undefined to begin with
      if (token === undefined) {
        token = auth.getToken();
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
          auth.saveToken(response.token);
        });
    };

    service.login = function(user) {
      return $http.post('/api/login', user)
        .success(function(response) {
          auth.saveToken(response.token);
        });
    };

    service.logOut = function() {
      $window.localStorage.removeItem(storageKey);
    };

    return service;
  }
]);
