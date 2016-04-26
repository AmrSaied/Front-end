app.controller('headerCtrl', function($rootScope, $scope, $state, $location,
		authenticateService) {
	
	$scope.logout = function() {
		authenticateService.logout().then(function(success) {
			noty({
				text : success,
				layout : 'topRight',
				timeout : 3000,
				type : 'success'
			});
			$state.go("access.signin");
		}, function(fail) {
			console.log(fail);
		});
	};

});