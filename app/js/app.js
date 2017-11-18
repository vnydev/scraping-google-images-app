// var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria']);
var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);
app.run(function ($rootScope, $routeParams) {
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
        .when("/profile/:keyname", {
            templateUrl: "../template/profile.html",
            controller:'search_profile_ctrl'
        })
        .otherwise('/');
});

app.controller("mainCtrl", function($scope, $rootScope){
    $rootScope.isActive = false;
    $rootScope.profileParam = ""
    // console.log("href", window.location.href);
    // var url =  window.location.href
    
    $scope.currentnav = function(menu){
    //  url = url.split('#/')[1].split('/')[0];
        if(menu == 'profile'){
            console.log("profile on")
            $rootScope.isActive = true;
        }else{
            console.log("profile off")
            $rootScope.isActive = false;
        }
       
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current) {
        // $scope.currentLink = getCurrentLinkFromRoute(current);
        console.log("current link", current)
      });  
  
})