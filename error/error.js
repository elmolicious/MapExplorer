app.controller('error_controller', ['$scope','$location', function ($scope, $location) {

    $scope.get_random_match_id = function(){
        console.log('urf');
    };

    $scope.get_match_from_history = function(){
        console.log('history');
    };

    $scope.get_from_match_id = function(){
        console.log('id');
    };
}]);