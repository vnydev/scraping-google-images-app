// var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria']);
var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);
app.run(function($rootScope){
    $rootScope.title = "hello"
})