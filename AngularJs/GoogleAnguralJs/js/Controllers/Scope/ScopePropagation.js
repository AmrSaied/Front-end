/**
 * Created by amrsaid on 12/20/2015.
 */
(function(angular) {
    'use strict';
    angular.module('eventExample', [])
        .controller('EventController', ['$scope', function($scope) {
            $scope.count = 0;
            $scope.$on('MyEvent', function() {
                $scope.count++;
            });
        }]);
})(window.angular);