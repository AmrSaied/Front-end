'use strict';

/**
 * Config for the router
 */
angular.module('app').run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    var url = window.location.href;
    var arr = url.split("/");
    var bindURL = arr[2];

    $rootScope.settings = {};
    //$rootScope.settings.baseUrlAuthentication = 'http://' + bindURL + '/winseeker-users';
    $rootScope.settings.baseUrlAuthentication = 'http://localhost:8081/winseeker-users';
    //$rootScope.settings.baseUrl = 'http://' + bindURL + '/winseekers';
    $rootScope.settings.baseUrl = 'http://localhost:8081/winseekers';

    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess');
    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, auth) {
        if (auth.authenticated === false) {
            $state.go("access.signin");
        }
    });

    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        $('.loader').show(); // winseekers.css
    });

    $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
        $('.loader').hide(); // winseekers.css
    });

}).config(function ($stateProvider, $urlRouterProvider, JQ_CONFIG) {

    $urlRouterProvider.otherwise('/app/dashboard');

    $stateProvider.state('access', {
        url: '/access',
        template: '<div ui-view></div>'
    }).state('access.signin', {
        url: '/signin',
        templateUrl: 'tpl/public/access_signin.html',
        resolve: {
            deps: [
                'uiLoad', function (uiLoad) {
                    return uiLoad.load([
                        'js/controllers/public/signinCtrl.js'
                    ]);
                }
            ]
        }
    }).state('access.signup', {
        url: '/signup',
        templateUrl: 'tpl/public/access_signup.html',
        resolve: {
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit', 'js/services/signupService.js'
                ]).then(function () {
                    return $ocLazyLoad.load([
                        'js/controllers/public/signupCtrl.js'
                    ]);
                });
            }
        }
    });

    $stateProvider.state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'tpl/app/app.html'
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'tpl/app/app_dashboard.html',
        resolve: {
            auth: function ($q, authenticateService) {
                var userInfo = authenticateService.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        authenticated: false
                    });
                }
            }
        }
    }).state('app.goals', {
        url: '/goals',
        templateUrl: 'tpl/app/app_goals.html',
        resolve: {
            auth: function ($q, authenticateService) {
                var userInfo = authenticateService.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        authenticated: false
                    });
                }
            },
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'js/services/app/manageGoalsService.js'
                ]).then(function () {
                    return $ocLazyLoad.load([
                        'js/controllers/app/manageGoalsController.js'
                    ]);
                });
            }
        }
    }).state('app.calendarSettings', {
        url: '/calendar-settings',
        templateUrl: 'tpl/app/app_calendar_settings.html',
        resolve: {
            auth: function ($q, authenticateService) {
                var userInfo = authenticateService.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        authenticated: false
                    });
                }
            },
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'js/services/app/manageCalendarService.js'
                ]).then(function () {
                    return $ocLazyLoad.load([
                        'js/controllers/app/manageCalendarSettingsController.js'
                    ]);
                });
            }
        }
    }).state('app.addCalendarSetting', {
        url: '/add-calendar-setting',
        templateUrl: 'tpl/app/add/calendar_setting.html',
        resolve: {
            auth: function ($q, authenticateService) {
                var userInfo = authenticateService.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        authenticated: false
                    });
                }
            },
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'js/services/app/manageCalendarService.js'
                ]).then(function () {
                    return $ocLazyLoad.load([
                        'js/controllers/app/addCalendarSettingController.js'
                    ]);
                });
            }
        }
    }).state('app.editCalendarSetting', {
        url: '/edit-calendar-setting/{id:int}',
        templateUrl: 'tpl/app/edit/calendar_setting.html',
        resolve: {
            auth: function ($q, authenticateService) {
                var userInfo = authenticateService.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        authenticated: false
                    });
                }
            },
            deps: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'js/services/app/manageCalendarService.js'
                ]).then(function () {
                    return $ocLazyLoad.load([
                        'js/controllers/app/editCalendarSettingController.js'
                    ]);
                });
            }
        }
    });

});
