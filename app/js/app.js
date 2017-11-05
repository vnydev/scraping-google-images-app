// var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria']);
var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);
app.run(function ($rootScope) {
    $rootScope.title = "hello"
})

app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('teal')
        .accentPalette('teal')
        .dark();
        $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "../template/home.html",
            controller:'home_ctrl'
        })
        .when("/search-history", {
            templateUrl: "../template/search_history.html",
            controller:'search_history_ctrl'
        })
        .when("/profile", {
            templateUrl: "../template/profile.html",
            controller:'home_ctrl'
        })
        .otherwise('/');
});
