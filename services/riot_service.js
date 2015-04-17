app.service('riot_service', ['$http', function ($http) {

    this.match_history = {
        get: function (summoner_name, callback) {
            $http.get('http://localhost:8080/match/history/by-name/' + summoner_name).
                success(function (data) {
                    callback(null, data);
                }).
                error(function (data) {
                    callback(data, null);
                });
        }
    };

    this.match_id = {
        get_list: function (callback) {
            $http.get('http://localhost:8080/match/id').
                success(function (data) {
                    callback(null, data);
                }).
                error(function (data) {
                    callback(data, null);
                });
        }
    };
}]);