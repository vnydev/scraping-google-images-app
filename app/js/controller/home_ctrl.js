app.controller('home_ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.allimages = [];
    $scope.searchImage = function (image_name) {
        $http({
            method: 'GET',
            url: '/api/images',
            params: { "image_name": image_name }
        }).then(function (res) {
            console.log("image get", res)

            if (res.data.status === 1) {
                $scope.allimages = res.data.data;
                $scope.saveSearchKeyword(image_name)
            } else if (res.data.status === 0) {
                $scope.allimages = [];
            }
        }, function (err) {
            console.log("error not found any image", err);
        });
    }

    $scope.saveSearchKeyword = function (key) {
        var url = '/api/search_keyword';
        var data = { 'keyword': key };
        var config = {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post(url, data, config).then(function (suc) {
            console.log("search keyword save", suc)
        }, function (err) {
            console.log("search key not save", err);
        })
    }

   
    
}])
