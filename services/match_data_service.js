app.service('match_data_service', ['$http', 'local_storage_service', function ($http, local_storage) {
    var that = this;
    this.turn = 0;
    this.data = {};
    this.initialized = false;

    this.initialize = function (match_id, callback) {

        var cached_data = local_storage.get(match_id);
        if (cached_data) {
            that.data = cached_data;
            that.initialized = true;
            return callback();
        }
        $http.get('http://localhost:8080/match/' + match_id + '/data').
            success(function (data) {
                local_storage.save(match_id, data);
                that.data = data;
                that.initialized = true;
                callback();
            }).
            error(function (data) {
                callback(data);
            });
    };

    this.advance_turn = function(turn){
        if(that.data.timeline.frames.length > turn){

            that.turn = turn;
            return true;
        }
        return false;
    };

    this.get_player_data = function (participantId) {
        return that.data.timeline.frames[that.turn].participantFrames[participantId];
    }
}]);