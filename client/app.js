var app = angular.module('checkit', []);

app.controller('CheckitCtrl', [
    '$scope',
    function($scope) {
        $scope.notes = [
            {message: 'herp', checked: false},
            {message: 'derp', checked: true}
        ];
        
        $scope.addNote = function() {
            if($scope.msg) {
                $scope.notes.push({
                    message: $scope.msg,
                    checked: false
                });
                $scope.msg = "";
            }
        }
        
        $scope.deleteNote = function(index) {
            $scope.notes.splice(index, 1);
        }
    }
]);