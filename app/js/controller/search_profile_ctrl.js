app.controller('search_profile_ctrl', function($scope, $routeParams, $rootScope , $http){
    var search_keyword = $routeParams.keyname
    console.log("request keyword is ", search_keyword);
    $rootScope.isActive = true;
    $rootScope.profileParam = search_keyword
    
    var keywordProfile = function(){
        var data = {"keyword":search_keyword}
        $http({
            method: 'GET',
            url: '/api/search_profile_details',
            params:data 
        }).then(function (res) {
            console.log("profileDetails get", res)
            if(res.data.status === 1){
                $scope.profileDetails = res.data.data;
            }else if(res.data.status === 0){
                $scope.profileDetails = [];
            }
        }, function (res) {
            console.error("error not found any image", res);
        });
    }
    if(search_keyword){
        keywordProfile()
        $scope.googleImages = search_keyword;
    }
})