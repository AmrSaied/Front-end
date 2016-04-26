app.controller('manageCalendarSettingsCtrl', function ($scope, manageCalendarService) {

    /* overrirde datatble options */
    $.extend($.fn.dataTable.defaults, {
        order: [[0, "desc"]],
        columnDefs: [
            {
                targets: [0],
                name: "id",
                visible: false,
                searchable: false,
                type: "num"
            }, {
                targets: [1],
                name: "name"
            }, {
                targets: [2],
                name: "startTime"
            }, {
                targets: [3],
                name: "endTime"
            }, {
                targets: [4],
                name: "duration"
            }, {
                targets: [5],
                name: "active"
            }, {
                targets: [6],
                name: "frequency"
            }, {
                targets: [7],
                searchable: false,
                sortable: false
            }
        ]
    });

    $scope.dtInstance = {};


    /* get all */
    angular.element(document).ready(function () {
        manageCalendarService.getAll().then(function (settings) {
            $scope.calendarSettings = settings;
        }, function (fail) {
        });
    });


    /* delete */
    $scope.deleteObj = function (id, index) {

        bootbox.confirm({
            title: 'حذف الاعداد',
            message: 'هل تريد تأكيد الحذف ؟',
            buttons: {
                cancel: {label: 'إلغاء'},
                confirm: {label: 'حذف'}
            },
            callback: function (result) {

                if (result) {
                    id = 2;
                    manageCalendarService.deleteObj(id).then(function (success) {
                        manageCalendarService.getAll().then(function (settings) {
                                var i = $scope.calendarSettings.length;
                                while (i--) {
                                    if ($scope.calendarSettings[i]) {
                                        $scope.calendarSettings.splice(i, 1);
                                    }
                                }
                                $scope.calendarSettings.push.apply($scope.calendarSettings, settings);
                            },
                            function (reason) {
                            });

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

            }
        });

    };

});