app.factory('manageCalendarService', function ($rootScope, $http, $q) {

    var getAll = function () {
        var deferred = $q.defer();

        userObj = {
            memberId: "1235"
        };

        $http({
            method: 'POST',
            url: $rootScope.settings.baseUrl + '/scheduleSettingsService/getAllByUser',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(userObj)
        }).then(function (success) {
            deferred.resolve(success.data);
        }, function (fail) {
            deferred.reject(fail);
        });

        return deferred.promise;
    };

    var create = function (settingObj) {
        var deferred = $q.defer();

        userObj = {
            userInfo: {
                memberId: "1235",
                channel: "mobile"
            },
            settings: {
                operation: "c",
                name: settingObj.name,
                startTime: settingObj.startTime,
                endTime: settingObj.endTime,
                frequency: {
                    id: "1212"
                }
            }
        };

        $http({
            method: 'POST',
            url: $rootScope.settings.baseUrl + '/scheduleSettingsService/operations',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(userObj)
        }).then(function (success) {
            deferred.resolve("تم الحفظ بنجاح");
        }, function (fail) {
            deferred.reject(fail);
        });

        return deferred.promise;
    };

    var read = function (id) {
        var deferred = $q.defer();

        userObj = {
            userInfo: {
                memberId: "1235",
                channel: "mobile"
            },
            settings: {
                operation: "r",
                id: id
            }
        };

        $http({
            method: 'POST',
            url: $rootScope.settings.baseUrl + '/scheduleSettingsService/operations',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(userObj)
        }).then(function (success) {
            deferred.resolve(success.data);
        }, function (fail) {
            deferred.reject(fail);
        });

        return deferred.promise;
    };

    var update = function (settingObj) {
        var deferred = $q.defer();

        userObj = {
            userInfo: {
                memberId: "1235",
                channel: "mobile"
            },
            settings: {
                operation: "u",
                id: settingObj.id,
                name: settingObj.name,
                startTime: settingObj.startTime,
                endTime: settingObj.endTime,
                frequency: {
                    id: "1212"
                }
            }
        };

        $http({
            method: 'POST',
            url: $rootScope.settings.baseUrl + '/scheduleSettingsService/operations',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(userObj)
        }).then(function (success) {
            deferred.resolve("تم الحفظ بنجاح");
        }, function (fail) {
            deferred.reject(fail);
        });

        return deferred.promise;
    };

    var deleteObj = function (id) {
        var deferred = $q.defer();

        userObj = {
            "userInfo": {
                "memberId": "1235",
                "channel": "mobile"
            },
            "settings": {
                "operation": "d",
                "id": id
            }
        };

        $http({
            method: 'POST',
            url: $rootScope.settings.baseUrl + '/scheduleSettingsService/operations',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(userObj)
        }).then(function (success) {
            deferred.resolve("تم الحذف بنجاح");
        }, function (fail) {
            deferred.reject(fail);
        });

        return deferred.promise;
    };

    return {
        getAll: getAll,
        create: create,
        read: read,
        update: update,
        deleteObj: deleteObj
    };

});