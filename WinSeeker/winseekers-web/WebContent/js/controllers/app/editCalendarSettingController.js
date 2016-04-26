app.controller('editCalendarSettingCtrl', function ($scope, $rootScope, $stateParams, manageCalendarService) {

    /* calendar setting id */
    var id = $stateParams.id;

    /* read setting */
    angular.element(document).ready(function () {
        manageCalendarService.read(id).then(function (setting) {
            $scope.setting = {
                id: id,
                name: setting.settings.name,
                fromTime: $rootScope.timeStringToDateTime(setting.settings.startTime),
                toTime: $rootScope.timeStringToDateTime(setting.settings.endTime)
            };
        }, function (fail) {
            noty({
                text: fail,
                layout: 'topRight',
                timeout: 3000,
                type: 'error'
            });
        });
    });

    $scope.editCalendarSetting = function () {
        if ($scope.editCalendarSettingForm.$valid) {
            $scope.setting.startTime = $rootScope.dateTimeToTimeString($scope.setting.fromTime);
            $scope.setting.endTime = $rootScope.dateTimeToTimeString($scope.setting.toTime);
            manageCalendarService.update($scope.setting).then(function (success) {
                noty({
                    text: success,
                    layout: 'topRight',
                    timeout: 3000,
                    type: 'success'
                });
            }, function (fail) {
                noty({
                    text: fail,
                    layout: 'topRight',
                    timeout: 3000,
                    type: 'error'
                });
            });
        }
    };

});