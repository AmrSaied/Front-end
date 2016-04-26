'use strict';

angular.module('app').controller('AppCtrl', function ($rootScope, $scope, $localStorage, $window) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

    // config
    $scope.app = {
        name: 'Winseekers',
        version: '1.0.0',
        // for chart colors
        color: {
            primary: '#7266ba',
            info: '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger: '#f05050',
            light: '#e8eff0',
            dark: '#3a3f51',
            black: '#1c2b36'
        },
        settings: {
            themeID: 1,
            navbarHeaderColor: 'bg-black',
            navbarCollapseColor: 'bg-white-only',
            asideColor: 'bg-black',
            headerFixed: true,
            asideFixed: false,
            asideFolded: false,
            asideDock: false,
            container: false
        }
    }

    // save settings to local storage
    if (angular.isDefined($localStorage.settings)) {
        $scope.app.settings = $localStorage.settings;
    } else {
        $localStorage.settings = $scope.app.settings;
    }

    $scope.$watch('app.settings', function () {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
            // aside dock and fixed must set the header fixed.
            $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
    }, true);

    function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return ( /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/ ).test(ua);
    }

    /* datatable localization */
    $.extend($.fn.dataTable.defaults, {
        "language": {
            "lengthMenu": "عرض _MENU_ سجلات بالصفحة",
            "sSearch": "البحث ",
            "zeroRecords": "لا يوجد شيء ",
            "info": "عرض الصفحة _PAGE_ من _PAGES_",
            "infoEmpty": "لا توجد بيانات",
            "infoFiltered": "(تمت تصفيتها من _MAX_ إجمالي السجلات)",
            "sEmptyTable": "لا توجد بيانات",
            "sInfo": "عرض _START_ الي _END_ من _TOTAL_ مدخلات",
            "sInfoEmpty": "عرض 0 الي 0 من 0 مدخلات",
            "sInfoThousands": ",",
            "sLengthMenu": "عرض _MENU_ مدخلات",
            "sLoadingRecords": "تحميل ...",
            "sProcessing": "معالجة...",
            "sZeroRecords": "لا توجد سجلات مطابقة وجدت",
            "oPaginate": {
                "sFirst": "الاول",
                "sLast": "الاخير",
                "sNext": "التالي",
                "sPrevious": "السابق"
            },
            "oAria": {
                "sSortAscending": ": تفعيل لفرز العمود تصاعدي",
                "sSortDescending": ": تفعيل لفرز العمود تنازليا"
            },
            "decimal": ",",
            "thousands": "."
        },
        "lengthMenu": [
            [
                10, 25, 50, 100, -1
            ], [
                10, 25, 50, 100, "All"
            ]
        ],

        "date-uk-pre": function (a) {
            if (a == null || a == "") {
                return 0;
            }
            var ukDatea = a.split('/');
            return ( ukDatea[2] + ukDatea[1] + ukDatea[0] ) * 1;
        },

        "date-uk-asc": function (a, b) {
            return ( ( a < b ) ? -1 : ( ( a > b ) ? 1 : 0 ) );
        },

        "date-uk-desc": function (a, b) {
            return ( ( a < b ) ? 1 : ( ( a > b ) ? -1 : 0 ) );
        }

    });

    /* reaset form validation */
    $rootScope.resetFormValidation = function (formName) {
        if (formName) {
            formName.$setPristine();
            formName.$setUntouched();
        }
    };

    $rootScope.dateToStringFormat = function (date, separator) {
        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();

        if (!separator)
            separator = "/"

        return curr_date + separator + curr_month + separator + curr_year;
    };

    $rootScope.dateTimeToTimeString = function (date) {
        var d = new Date(date);
        var hours = d.getHours();
        var mins = d.getMinutes();
        return hours + ":" + mins;
    };

    $rootScope.timeStringToDateTime = function (time) {
        var d = new Date();
        var array = time.split(':');
        var hour = array[0];
        var mins = array[1];
        var secs = array[2];

        if (hour)
            d.setHours(hour);

        if (mins)
            d.setMinutes(mins);

        if (secs)
            d.setSeconds(secs);

        return d;
    };

});
