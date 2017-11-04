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
            controller:'home_ctrl'
        })
        .when("/profile", {
            templateUrl: "../template/profile.html",
            controller:'home_ctrl'
        })
        .otherwise('/');
});
app.controller('home_ctrl', function ($scope, $http) {
    $scope.allimages = [];
    $scope.searchImage = function (image_name) {
        $http({
            method: 'GET',
            url: '/images/' + image_name,
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("image get", response)
            $scope.allimages = response.data.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            console.log("error not found any image", response);
        });
    }
})