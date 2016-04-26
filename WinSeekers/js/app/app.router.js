/**
 * Created by Amr Abd Elrhim on 18/04/2016.
 */
WinSeekers.config( function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        title:'WinSeekers. Achieve your goals and win your life.',
        templateUrl: 'pages/home.html'})
        .state('signin', {
            url: '/signin',
            title:'Sign in',
            controller:"SignInControllers",
            templateUrl: 'pages/signin.html'});
});