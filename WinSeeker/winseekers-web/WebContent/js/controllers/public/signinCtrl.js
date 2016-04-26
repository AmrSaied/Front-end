'use strict';

/* Controllers */
// signin controller
app.controller( 'signinController', function ( $scope, $state, $location, authenticateService ) {

	var userInfo = authenticateService.getUserInfo();

	if ( $location.path().indexOf( 'signin' ) > -1 && userInfo ) {
		$state.go( 'app.dashboard' );
		return;
	}

	$scope.user = {};
	$scope.signin = function () {
		authenticateService.signin( $scope.user.username, $scope.user.password ).then( function ( success ) {
			noty( {
				text : success,
				layout : 'topRight',
				timeout : 3000,
				type : 'success'
			} );
			$state.go( 'app.dashboard' );
		}, function ( fail ) {
			noty( {
				text : fail,
				layout : 'topRight',
				timeout : 3000,
				type : 'error'
			} );
		} );
	};
} );