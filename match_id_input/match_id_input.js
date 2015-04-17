app.controller('match_controller',
    ['$scope', '$location', 'match_data_service', 'static_data_service',
        function ($scope, $location, match_data, static_data) {

            $scope.match_id = 2060778706;
            $scope.enter_match_id = function () {
                async.series([
                        function (done) {
                            match_data.initialize($scope.match_id, done);
                        },
                        function (done) {
                            static_data.initialize(done);
                        }],
                    function (error, result) {
                        if (error) {
                            return $location.path('/error');
                        }
                        $location.path('/replay/' + $scope.match_id);
                    });
            };
        }]);