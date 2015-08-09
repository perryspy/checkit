var app = angular.module('checkit');

app.factory('Note', [
    '$resource',
    function($resource) {
        return $resource('/api/notes/:noteId',
          { noteId: '@_id'},
          { 'update': {method: 'PUT'} }
        );
    }
]);