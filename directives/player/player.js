app.directive('player', ['static_data_service', 'data_dragon_service', 'match_data_service', function (static_data, data_dragon, match) {
    return {
        restrict: 'AE',
        templateUrl: 'directives/player/player.html',
        scope: {
            player_data: '=playerdata',
            focus_player: '=focusplayer',
            player_controller: '=playercontroller'
        },
        link: function ($scope, element, attrs) {
            $scope.current = match.get_player_data($scope.player_data.participantId);

            $scope.turn = match.turn;

            $scope.player_controller['update' + $scope.player_data.participantId] = function () {
                $scope.current = match.get_player_data($scope.player_data.participantId);
            };

            $scope.get_gold_per_minute = function(){
                if(match.turn === 0){
                    return $scope.current.totalGold;
                }
                return Math.round($scope.current.totalGold / match.turn);
            };

            $scope.get_minions_per_minute = function(){
                if(match.turn === 0){
                    return 0;
                }
                return Math.round((($scope.current.jungleMinionsKilled + $scope.current.minionsKilled) / match.turn)*100)/100;
            };

            $scope.get_total_gold = function(){
                if($scope.current.totalGold < 1000)
                    return $scope.current.totalGold;

                return '' + Math.round($scope.current.totalGold/100)/10 + 'k';
            };

            $scope.get_champion_img = function (champion_id) {
                return data_dragon.get_champion_img_url(champion_id);
            };

            $scope.get_spell_img = function (spell_id) {
                return data_dragon.get_spell_img_url(spell_id);
            };

            $scope.get_champion_name = function (champion_id) {
                return static_data.champions[champion_id].name;
            };

            $scope.click_player = function () {
                $scope.focus_player($scope.player_data.participantId);
            };

        }
    };
}]);