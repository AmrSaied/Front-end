app.factory( 'signupService', function ( $rootScope, $http, $q ) {

	var signup = function ( userObj ) {
		var deferred = $q.defer();

		$http( {
			method : 'POST',
			url : $rootScope.settings.baseUrlAuthentication + '/registerService/add',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : JSON.stringify( userObj )
		} ).then( function ( success ) {
			deferred.resolve( 'تم التسجيل بنجاح' );
		}, function ( fail ) {
			deferred.reject( fail.data.errors[ 0 ].errorMessage );
		} );

		return deferred.promise;
	};

	var checkCaptcha = function ( response ) {
		var deferred = $q.defer();

		$http( {
			method : 'POST',
			url : $rootScope.settings.baseUrlAuthentication + '/loginService/checkCaptcha',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			data : 'captchaResponse=' + response
		} ).then( function ( success ) {
			deferred.resolve( success );
		}, function ( fail ) {
			deferred.reject( fail )
		} );

		return deferred.promise;
	};

	return {
		signup : signup,
		checkCaptcha : checkCaptcha
	};

} );