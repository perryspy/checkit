var module = angular.module('checkit');

module.controller('CheckitCtrl', [
    '$scope', '$http', 'Note',
    function($scope, $http, Note) {

        $scope.getNotes = function() {
            $scope.notes = Note.query();
        };

        $scope.createNote = function() {
            // Create a new instance of the Resource
            var note = new Note({
                message: $scope.msg,
                checked: false
            });

            // use the resource save function
            note.$save(function(response) {
                // Redirect after save
                //$location.path('notes/' + response._id);

                // Clear form fields
                $scope.msg = '';

                $scope.notes.push(note);
            }, function(errorResponse) {
                console.log('error creating note', errorResponse);
            });
        };

        $scope.getNote = function() {
            //$scope.note = Note.get({
            //    noteId: $stateParams.categoryId
            //});
        };

        $scope.updateNote= function(note) {
            note.$update(function(response) {

            }, function(errorResponse) {

            });
        };

        $scope.deleteNote = function(note) {
            note.$remove(function(response) {
                // remove it from our local collection
                for (var i in $scope.notes) {
                    if ($scope.notes [i] === note) {
                        $scope.notes.splice(i, 1);
                    }
                }
            }, function(errorResponse) {
            });
        };


    }
]);
