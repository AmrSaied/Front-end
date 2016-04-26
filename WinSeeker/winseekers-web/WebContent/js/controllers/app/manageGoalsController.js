app.controller('manageGoalsCtrl', function ($scope, manageGoalsService) {

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
                name: "title"
            }, {
                targets: [2],
                name: "description"
            }, {
                targets: [3],
                name: "targetDate"
            }, {
                targets: [4],
                name: "targetValue"
            }, {
                targets: [5],
                "name": "baseValue"
            }, {
                targets: [6],
                searchable: false,
                sortable: false
            }
        ]
    });

    $scope.dtInstance = {};

    angular.element(document).ready(function () {
        manageGoalsService.getAll().then(function (goals) {
            $scope.goals = goals;
        }, function (reason) {

        });
    });

});