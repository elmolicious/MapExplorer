app.service('static_data_service', ['$http', 'local_storage_service', function ($http, local_storage) {
    this.maps = {};
    this.summoner_spells = {};
    this.items = {};
    this.champions = {};

    var that = this;
    this.initialized = false;

    this.initialize = function (callback) {
        if (that.initialized)
            return callback();
        async.parallel({
            get_static_champion_data: function (done) {
                var data = local_storage.get('champions');
                if (data) {
                    return done(null, data);
                }
                static_data.champions.get(function (error, response) {
                    local_storage.save('champions', response.data);
                    done(error, response.data);
                });
            },
            get_static_map_data: function (done) {
                var data = local_storage.get('maps');
                if (data) {
                    return done(null, data);
                }
                static_data.maps.get(function (error, response) {
                    local_storage.save('maps', response.data);
                    done(error, response.data);
                });
            },
            get_static_item_data: function (done) {
                var data = local_storage.get('items');
                if (data) {
                    return done(null, data);
                }
                static_data.items.get(function (error, response) {
                    local_storage.save('items', response.data);
                    done(error, response.data);
                });
            },
            get_static_summoner_spell_data: function (done) {
                var data = local_storage.get('summoner_spells');
                if (data) {
                    return done(null, data);
                }
                static_data.summoner_spells.get(function (error, response) {
                    local_storage.save('summoner_spells', response.data);
                    done(error, response.data);
                });
            }
        }, function (error, result) {
            if (error) {
                callback(error);
            }
            that.maps = result.get_static_map_data;
            that.summoner_spells = result.get_static_summoner_spell_data;
            that.items = result.get_static_item_data;
            that.champions = result.get_static_champion_data;
            that.initialized = true;
            callback(null);
        });
    };

    var static_data = {
        maps: {
            get: function (callback) {
                $http.get('http://localhost:8080/static/maps/data').
                    success(function (data) {
                        callback(null, data)
                    }).
                    error(function (data) {
                        callback(data, null)
                    });
            }
        },
        champions: {
            get: function (callback) {
                $http.get('http://localhost:8080/static/champions/data').
                    success(function (data) {
                        callback(null, data)
                    }).
                    error(function (data) {
                        callback(data, null)
                    });
            }
        },
        summoner_spells: {
            get: function (callback) {
                $http.get('http://localhost:8080/static/summoner-spells/data').
                    success(function (data) {
                        callback(null, data)
                    }).
                    error(function (data) {
                        callback(data, null)
                    });
            }
        },
        items: {
            get: function (callback) {
                $http.get('http://localhost:8080/static/items/data').
                    success(function (data) {
                        callback(null, data)
                    }).
                    error(function (data) {
                        callback(data, null)
                    });
            }
        }
    };
}]);