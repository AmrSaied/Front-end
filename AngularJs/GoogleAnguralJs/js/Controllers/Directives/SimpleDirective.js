/**
 * Created by amrsaid on 12/28/2015.
 */

(function(angular) {
    'use strict';
    angular.module('docsSimpleDirective', [])
        .controller('Controller', ['$scope', function($scope) {
            $scope.customer = {
                name: 'Naomi',
                address: '1600 Amphitheatre'
            };
        }])



        .directive('myCustomer', function() {
            return {
                template: 'Name: {{customer.name}} Address: {{customer.address}}'
            };
        });
})(window.angular);
