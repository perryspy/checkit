var app = angular.module('checkit', []);

app.controller('CheckitCtrl', [
    '$scope', '$http',
    function($scope, $http) {
        
        $scope.getNotes = function() {
            $http.get('/api/notes')
                .success(function(data) {
                    console.log(data);
                    $scope.notes = data;
                }
            );
        };
        
        $scope.createNote = function() {
            if($scope.msg) {
                $http.post('/api/notes', {
                    message: $scope.msg,
                    checked: false
                    }).success(function() {
                        $scope.msg = "";
                        $scope.getNotes();
                    }
                );
            }
        };
        
        $scope.deleteNote = function(index) {
            if($scope.notes[index]) {
                $http.delete('/api/notes/' + $scope.notes[index]._id)
                    .success(function() {
                        $scope.getNotes();
                    }
                );
            }
        };
        
        $scope.checkMessage = function(index) {
            if($scope.notes[index]) {
                $http.put('/api/notes/' + $scope.notes[index]._id, $scope.notes[index])
                    .success(function() {
                        $scope.getNotes();
                    }
                );
            }
        };
        
        $scope.getNotes();
    }
]);