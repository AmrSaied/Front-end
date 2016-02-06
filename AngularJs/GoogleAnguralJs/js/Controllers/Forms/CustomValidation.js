(function(angular) {
    'use strict';
    var app = angular.module('form-example1', []);

    var INTEGER_REGEXP = /^\-?\d+$/;
    app.directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.integer = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });
    app.directive('overwriteEmail', function() {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, elm, attrs, ctrl) {
                // only apply the validator if ngModel is present and Angular has added the email validator
                if (ctrl && ctrl.$validators.email) {

                    // this will overwrite the default Angular email validator
                    ctrl.$validators.email = function(modelValue) {
                        return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                    };
                }
            }
        };
    });

    app.directive('contenteditable', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // view -> model
                elm.on('blur', function() {
                    ctrl.$setViewValue(elm.html());
                });

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        };
    });

    app.directive('username', function($q, $timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

                ctrl.$asyncValidators.username = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    $timeout(function() {
                        // Mock a delayed response
                        if (usernames.indexOf(modelValue) === -1) {
                            // The username is available
                            def.resolve();
                        } else {
                            def.reject();
                        }

                    }, 2000);

                    return def.promise;
                };
            }
        };
    });
})(window.angular);

