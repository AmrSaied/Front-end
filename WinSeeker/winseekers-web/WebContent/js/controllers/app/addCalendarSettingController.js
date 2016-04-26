app.controller('addCalendarSettingCtrl', function ($scope, $rootScope, manageCalendarService) {

    $scope.setting = {};
    $scope.setting.fromTime = new Date();

    $scope.addCalendarSetting = function () {
        if ($scope.addCalendarSettingForm.$valid) {
            $scope.setting.startTime = $rootScope.dateTimeToTimeString($scope.setting.fromTime);
            $scope.setting.endTime = $rootScope.dateTimeToTimeString($scope.setting.toTime);
            manageCalendarService.create($scope.setting).then(function (success) {
                noty({
                    text: success,
                    layout: 'topRight',
                    timeout: 3000,
                    type: 'success'
                });
                $scope.resetFormValue();
                $rootScope.resetFormValidation($scope.addCalendarSettingForm);
            }, function (fail) {

            });
        }
    };


    /* Helpers */
    $scope.resetFormValue = function () {
        $scope.setting.name = '';
        $scope.setting.fromTime = new Date();
        $scope.setting.toTime = '';
        $scope.setting.startTime = '';
        $scope.setting.endTime = '';
    };


});