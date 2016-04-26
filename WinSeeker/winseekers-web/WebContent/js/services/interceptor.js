app.factory( 'myHttpInterceptor', function ( $q, $window, $injector, $localStorage, $sessionStorage ) {
	return {
		request : function ( request ) {
			console.log( 'interceptor->request' );
			if ( $sessionStorage.userInfo ) {
				// token is the name that used in the RestService.java @RequestHeader('token')
				//request.headers.common.token = $injector.get( 'authenticateService' ).getToken();
				request.headers.token = $injector.get( 'authenticateService' ).getToken();
			}
			//request.headers["Content-Type"] = 'application/json';			
			return request;
		},

		requestError : function ( request ) {
			console.log( 'interceptor->requestError' );
			return $q.reject( request );
		},

		response : function ( response ) {
			console.log( 'interceptor->response' );
			return response;
		},

		responseError : function ( response ) {
			console.log( 'interceptor->responseError' );

			if ( response.status === 403 ) { /* token expire */
				$injector.get( 'authenticateService' ).logout().then( function ( success ) {
					noty( {
						text : success,
						layout : 'topRight',
						timeout : 3000,
						type : 'success'
					} );
					$injector.get( '$state' ).go( "access.signin" );
				}, function ( fail ) {
					console.log( fail );
				} );
			} else if ( response.status === 400 ) { /* Bad request */
				return $q.reject( 'خطأ في البيانات المرسلة' );
			} else if ( response.status === 417 ) { /* connection error */
				return $q.reject( 'خطأ في الاتصال بالسيرفر' );
			} else if ( response.status === 500 ) { /* internal server error */
				return $q.reject( 'خطأ في السيرفر' );
			}

			return $q.reject( response );
		}
	};
} );

app.config( function ( $httpProvider ) {
	$httpProvider.interceptors.push( 'myHttpInterceptor' );
} );
