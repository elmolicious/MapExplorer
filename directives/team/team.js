app.directive('team', ['static_data_service','data_dragon_service',function(static_data, data_dragon){
    return {
        restrict : 'AE',
        templateUrl : 'directives/team/team.html',
        scope : {
            team : '=teamdata',
            participants : '=participants',
            focusplayer : '=focusplayer',
            playercontroller : '=playercontroller'
        },
        link : function($scope, element, attrs){
            $scope.team_id = $scope.team.teamId;
            $scope.get_champion_name = function (champion_id) {
                return static_data.champions[champion_id].name;
            };

            $scope.get_champion_img = function(champion_id){
                return data_dragon.get_champion_img_url(champion_id);
            };
        }
    };
}]);