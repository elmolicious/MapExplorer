app.controller('replay_controller', [
        '$scope',
        '$routeParams',
        '$location',
        'riot_service',
        'static_data_service',
        'data_dragon_service',
        'match_data_service',
        function ($scope, $routeParams, $location, riot, static_data, data_dragon, match) {

            if (!static_data.initialized || !match.initialized) {
                $location.path('/index');
            }

            $scope.turn = match.turn;
            var domain = {
                min: {x: -120, y: -120},
                max: {x: 14870, y: 14980}
            };
            var width = 512;
            var height = 512;

            var get_x = d3.scale.linear()
                .domain([domain.min.x, domain.max.x])
                .range([0, width]);

            var get_y = d3.scale.linear()
                .domain([domain.min.y, domain.max.y])
                .range([height, 0]);

            var svg;
            var participants = [];

            $scope.static_data = static_data;
            $scope.team_1_id = 1;
            $scope.team_2_id = 2;
            $scope.match_data = match.data;
            $scope.focused_player;


            $scope.player_controller = {

            };

            $scope.backturn = function(){
                $scope.turn--;
            };

            $scope.advanceturn = function(){
                $scope.turn++;
            };

            $scope.get_champion_img = function (champion_id) {
                return data_dragon.get_champion_img_url(champion_id);
            };

            $scope.get_map_img = function (map_id) {
                return data_dragon.get_map_img_url(map_id);
            };

            $scope.get_map_name = function (map_id) {
                var map_name = static_data.maps[map_id].mapName.replace('New', '');
                if (map_name === 'SummonersRift')
                    return 'Summoners Rift';
                $location.path('/error/unsupported_map');
            };

            $scope.focus_player = function (participant_id) {
                $scope.focused_player = participant_id;
                d3.select('.active1').
                    classed('active1', false);

                d3.select('.active2').
                    classed('active2', false);

                if(participant_id <= 5){
                    d3.select('.player'+participant_id).
                        classed('active1', true);
                }
                else{
                    d3.select('.player'+participant_id).
                        classed('active2', true);
                }

                circle_focused_player(participant_id);

                d3.select("#participant" + participant_id).
                    moveToFront();
            };

            function circle_focused_player (participant_id){
                d3.select('#active_border').
                    remove();

                d3.select('svg').append('circle').
                    attr('cx', function (d) {
                        return get_x($scope.match_data.timeline.frames[$scope.turn].participantFrames[participant_id].position.x);
                    }).
                    attr('cy', function (d) {
                        return get_y($scope.match_data.timeline.frames[$scope.turn].participantFrames[participant_id].position.y);
                    }).
                    attr('id','active_border').
                    attr('r', 17).
                    attr('stroke',function(){
                        if(participant_id <= 5){
                            return 'green';
                        }
                        else{
                            return 'red';
                        }
                    }).
                    attr('stroke-width', 3).
                    attr('fill', 'none');
            }

            $scope.$watch('turn', function (newValue, oldValue) {
                if (isNaN(newValue) || !match.data.timeline.frames[newValue]) {
                    return $scope.turn = oldValue;
                }
                if (!match.advance_turn(newValue)) {
                    return $scope.turn = oldValue;
                }
                Object.keys($scope.player_controller).forEach(function(key){
                    $scope.player_controller[key]();
                });
                $scope.advance_turn();
            });

            $scope.advance_turn = function () {

                participants.
                    transition().
                    duration(1000).
                    attr('cx', function (d) {
                        return get_x($scope.match_data.timeline.frames[$scope.turn].participantFrames[d].position.x);
                    }).
                    attr('cy', function (d) {
                        return get_y($scope.match_data.timeline.frames[$scope.turn].participantFrames[d].position.y);
                    });

                d3.select('#active_border').
                    transition().
                    duration(1000).
                    attr('cx', function (d) {
                        return get_x($scope.match_data.timeline.frames[$scope.turn].participantFrames[$scope.focused_player].position.x);
                    }).
                    attr('cy', function (d) {
                        return get_y($scope.match_data.timeline.frames[$scope.turn].participantFrames[$scope.focused_player].position.y);
                    });
            };

            $scope.match_id = $routeParams.match_id;

            svg = d3.select("#map").append('svg:svg')
                .attr("width", width)
                .attr("height", height);

            var defs = svg.append('svg:defs');

            match.data.participants.forEach(function (participant) {
                defs.append('pattern').
                    attr('id', 'id' + participant.participantId).
                    attr('width', 32).
                    attr('height', 32).
                    append('image').
                    attr('width', 32).
                    attr('height', 32).
                    attr('xlink:href', $scope.get_champion_img(participant.championId));
            });

            defs.append('pattern').
                attr('id', 'baron_image').
                attr('width', 32).
                attr('height', 32).
                append('image').
                attr('width', 32).
                attr('height', 32).
                attr('xlink:href', 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/profileicon/539.png');

            svg.selectAll('circle').data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).
                enter().append('circle').
                attr('cx', 30).
                attr('cy', 30).
                attr('r', 16).
                attr('id', function (d) {
                    return 'participant' + d;
                }).
                attr('fill', function (d) {
                    return 'url(#id' + d + ')';
                });


            $scope.initialized = true;
            participants = d3.selectAll('circle');

        }]
);