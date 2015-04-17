app.controller('history_controller', ['$scope','riot_service','$location','match_data_service','static_data_service', function ($scope, riot, $location, match_data, static_data) {
    $scope.summoner_name = 'hi elmo';
    $scope.match_history;

    $scope.get_match_history = function(){
        riot.match_history.get($scope.summoner_name, function (error, data) {
            if (error) {
                return $location.path('/error');
            }
            $scope.match_history = data.games;
        })
    };

    $scope.enter_match_id = function(match){
        async.series([
            function (done) {
                match_data.initialize(match.gameId,done);
            },
            function (done) {
                static_data.initialize(done);
            }],
            function (error, result){
                if(error){
                    return $location.path('/error');
                }
                $location.path('/replay/'+ match.gameId);
            });
    };
}]);