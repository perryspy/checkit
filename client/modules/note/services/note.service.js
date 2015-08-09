var module = angular.module('note');

module.factory('Note', [
    '$resource',
    function($resource) {
        return $resource('/api/notes/:noteId',
          { noteId: '@_id'},
          { 'update': {method: 'PUT'} }
        );
    }
]);
