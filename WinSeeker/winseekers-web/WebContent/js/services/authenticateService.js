app.factory( 'authenticateService', function ( $rootScope, $http, $q, $localStorage, $sessionStorage ) {

	var signin = function ( username, password ) {
		var deferred = $q.defer();

		$http( {
			method : 'POST',
			url : $rootScope.settings.baseUrlAuthentication + '/loginService/checkLogin',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			data : 'username=' + username + '&password=' + password
		} ).then( function ( success ) {
			console.log( success )
			if ( success.status === 200 ) {
				$sessionStorage.userInfo = JSON.stringify( success.data );
				deferred.resolve( 'تم تسجيل الدخول بنجاح' );
			}
		}, function ( fail ) {
			if ( fail.status === 401 ) {
				// deferred.reject( 'خطأ في اسم المستخدم او كلمة المرور' );
				deferred.reject( fail.data.errors[ 0 ].errorMessage );
			} else if ( fail.status === 412 ) {
				deferred.reject( 'هذا الحساب غير مفعل , يرجي التواصل مع مدير النظام لتفعيل الحساب' );
			} else {
				deferred.reject( fail );
			}
		} );

		return deferred.promise;
	};

	var getUserInfo = function () {
		var userInfo = null;
		if ( $sessionStorage.userInfo ) {
			userInfo = JSON.parse( $sessionStorage.userInfo );
		}
		return userInfo;
	};

	var getToken = function () {
		var token = null;
		if ( $sessionStorage.userInfo ) {
			token = JSON.parse( $sessionStorage.userInfo ).token;
		}
		return token;
	};

	var logout = function () {
		var deferred = $q.defer();

		if ( $sessionStorage.userInfo ) {
			delete $sessionStorage.userInfo;
			deferred.resolve( 'تم تسجيل الخروج بنجاح' );
		} else {
			deferred.reject( 'خطأ في الاتصال بالسيرفر' );
		}

		return deferred.promise;
	};

	return {
		signin : signin,
		getUserInfo : getUserInfo,
		getToken : getToken,
		logout : logout
	};

} );