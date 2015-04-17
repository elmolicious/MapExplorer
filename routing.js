app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/',{
                controller: 'match_selection_controller',
                controllerAs: 'match_selection',
                templateUrl: 'match_selection/match_selection.html',
                title : 'Welcome'
            }).
            when('/replay/:match_id', {
                controller: 'replay_controller',
                controllerAS: 'replay',
                templateUrl: 'replay/replay.html',
                title : 'Map Replay'
            }).
            when('/match/by-id', {
                controller : 'match_controller',
                controllerAs : 'match',
                templateUrl : 'match_id_input/match_id_input.html',
                title : 'Match ID'
            }).
            when('/match/by-history', {
                controller: 'history_controller',
                controllerAs: 'history',
                templateUrl : 'match_history/match_history.html',
                title : 'Match History'
            }).
            when('/error', {
                controller: 'error_controller',
                controllerAs : 'error',
                templateUrl : 'error/error.html',
                title : 'Error'
            }).
            otherwise({
                redirectTo : '/'
            });
    }]);