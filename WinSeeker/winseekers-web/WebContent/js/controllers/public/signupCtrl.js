'use strict';

/* Controllers */
// signin controller
app.controller( 'signupController', function ( $scope, $state, $location, authenticateService, signupService ) {

	var userInfo = authenticateService.getUserInfo();

	if ( $location.path().indexOf( 'signup' ) > -1 && userInfo ) {
		$state.go( 'app.dashboard' );
		return;
	}

	$scope.user = {};
	$scope.isValidCaptcha = false;

	$scope.setResponse = function ( response ) {
		// send the `response` to your server for verification.
		signupService.checkCaptcha( response ).then( function ( success ) {
			$scope.isValidCaptcha = true;
			$( '#captcha-reset' ).text( '' );
		}, function ( fail ) {
			$scope.isValidCaptcha = false;
		} );
	};

	$scope.cbExpiration = function () {
		// reset the 'response' object that is on scope
		grecaptcha.reset();
		// $( '#captcha-reset' ).text( 'reset captcha session expired' );
		$( '#captcha-reset' ).text( 'لقد انتهت جلست الكابتشا قم باختيارها مرة اخري' );
	};

	$scope.signup = function () {
		if ( $scope.isValidCaptcha ) {
			signupService.signup( $scope.user ).then( function ( success ) {
				noty( {
					text : success,
					layout : 'topRight',
					timeout : 3000,
					type : 'success'
				} );
				$state.go( 'access.signin' );
			}, function ( fail ) {
				noty( {
					text : fail,
					layout : 'topRight',
					timeout : 3000,
					type : 'error'
				} );
			} );
		} else {
			noty( {
				text : "هناك خطأ في التحقق من الكابتشا",
				layout : 'topRight',
				timeout : 3000,
				type : 'error'
			} );
		}
	};

} );