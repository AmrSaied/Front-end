/**
 * Created by Amr Abd Elrhim on 18/04/2016.
 */
WinSeekers.run(function ( $state, $rootScope, $cookieStore, $location) {
    token = $cookieStore.get('token');
    $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.title;
    });

});