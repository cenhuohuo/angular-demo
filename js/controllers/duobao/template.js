angular.module("routerApp").controller("duobaoTemplateCtrl",["$scope","$stateParams","template","$window","$state","$http",function($scope,$stateParams,template,$window,$state,$http){
	$scope.goodsCode = $stateParams.goodsCode;
	$scope.condition = !!$scope.goodsCode;
    $scope.show_error = false;

    $scope.publishDuobaoTemplate=function(data){
        if(data.index1 == "") delete data.index1;
        if(!$scope.filterOptions.recommend) $scope.filterOptions.recommend = "n";
        template.add(null,data,function(a){
           alert('该商品添加至“商品列表—已发布的模板”列表中');
           $state.go("main.duobao.goodsList")
        },function(a){
        
        }) 
    }

    /*获取商品详情*/
    $scope.getGoodsDetail = function () {
        template.getByModuleCode({goodsModuleCode: $scope.goodsCode}, function (data) {
        	$scope.filterOptions = data;
        });

    };

    $scope.limitSquare = function(files,upload){
        var reader = new FileReader();
        reader.readAsDataURL(files[0].getNative());
        reader.onload = (function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                if (this.width === this.height) {
                    upload.start();
                } else {
                    upload.removeFile(files[0]);
                    // upload.stop();
                    alert('请上传正方形图片');
                }
            };
        });
    }

    $scope.$watch("filterOptions.recommend",function(newVal,oldVal){
        if(newVal == "n"){
            delete $scope.filterOptions.goodsCoverUrls;
        }
    })

    $scope.notNull = function () {
        var goodsThumbnailUrl = $scope.filterOptions.goodsThumbnailUrl;
        var goodsPop = "";
        if($scope.filterOptions.recommend == "y"){
            goodsPop = $scope.filterOptions.goodsCoverUrl;
        }else{
            goodsPop = true;
        }
        return !goodsThumbnailUrl || !goodsPop;
    }

    if ($scope.condition) {
        $scope.getGoodsDetail();
    }

}])