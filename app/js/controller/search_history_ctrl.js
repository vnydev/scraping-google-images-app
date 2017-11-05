app.controller("search_history_ctrl", function($http, $scope){
    $scope.getSearchHistory = function(){
        
        $http({
            method: 'GET',
            url: '/api/search_history' 
        }).then(function (res) {
            console.log("search history get", res)
            if(res.data.status === 1){
                $scope.searchHistory = res.data.data;
            }else if(res.data.status === 0){
                $scope.searchHistory = [];
            }
        }, function (res) {
            console.error("error not found any image", res);
        });
    }
    $scope.getSearchHistory();
})