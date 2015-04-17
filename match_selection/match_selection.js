app.controller('match_selection_controller',
    ['$scope', '$location', 'riot_service', 'static_data_service', 'match_data_service', function ($scope, $location, riot_service, static_data, match_data) {

        $scope.get_random_match_id = function () {
            riot_service.match_id.get_list(function (error, data) {
                if (error || (!data && !data[0])) {
                    return $location.path('/error');
                }
                var match_id =  data[Math.abs(get_random_match_id(data))];
                initialize(match_id, function(){
                    $location.path('/replay/' + match_id);
                });
            });
        };

        function initialize(match_id, callback){
            async.series([
                    function (done) {
                        match_data.initialize(match_id, done);
                    },
                    function (done) {
                        static_data.initialize(done);
                    }],
                function (error, result) {
                    if (error) {
                        callback(error)
                    }
                    callback();
                });
        }

        $scope.get_match_from_history = function () {
            $location.path('/match/by-history');
        };

        $scope.get_from_match_id = function () {
            $location.path('/match/by-id');
        };

        function get_random_match_id(ids) {
            return Math.round((Math.random() * ids.length) - 0.5);
        }
    }]);