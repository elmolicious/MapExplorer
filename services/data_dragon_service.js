app.service('data_dragon_service', ['data_dragon_endpoint', 'static_data_service', function (data_dragon_endpoint, static_data) {
    this.build_image_url = function (type, ressource) {
        return data_dragon_endpoint + 'img/' + type + '/' + ressource;
    };


    this.get_champion_img_url = function (champion_id) {
        if (!static_data.champions[champion_id]) {
            return '#';
        }
        return this.build_image_url('champion', static_data.champions[champion_id].image.full);
    };

    this.get_spell_img_url = function(spell_id){
        if (!static_data.summoner_spells[spell_id]) {
            return '#';
        }
        return this.build_image_url('spell', static_data.summoner_spells[spell_id].image.full);
    };

    this.get_map_img_url = function(map_id){
        if (!static_data.maps[map_id]) {
            return '#';
        }
        return this.build_image_url('map', static_data.maps[map_id].image.full);
    };
}]);