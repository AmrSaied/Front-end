app.factory( 'manageGoalsService', function ( $rootScope, $http, $q ) {

	var getAll = function () {
		var deferred = $q.defer();

		userObj = {
			"userInfo" : {
				"memberId" : 1233
			}
		};

		$http( {
			method : 'POST',
			url : $rootScope.settings.baseUrl + '/goalService/getAllGoals',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : JSON.stringify( userObj )
		} ).then( function ( success ) {
			deferred.resolve( success.data );
		}, function ( fail ) {
			deferred.reject( fail );
		} );

		return deferred.promise;
	};

	return {
		getAll : getAll
	};

} );