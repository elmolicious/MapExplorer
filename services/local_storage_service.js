app.service('local_storage_service', function () {
    var local_storage = window.localStorage;

    this.save = function (id, data) {
        local_storage[id] = JSON.stringify(data);
    };

    this.get = function (id) {
        var data = local_storage[id];
        if (!data)
            return null;
        return JSON.parse(local_storage[id]);
    };
});