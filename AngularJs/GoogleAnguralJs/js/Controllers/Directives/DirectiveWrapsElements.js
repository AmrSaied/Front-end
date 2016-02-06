/**
 * Created by amrsaid on 12/29/2015.
 */
(function(angular) {
    'use strict';
    angular.module('docsTransclusionDirective', [])
        .controller('Controller', ['$scope', function($scope) {
            $scope.name = 'Tobias';
        }])
        .directive('myDialog', function() {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'my-dialog.html'
            };
        });
})(window.angular);