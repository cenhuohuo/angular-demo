angular.module("routerApp").controller("duobaoEditTemplate",["$scope","$stateParams","goodsDuobao",function ($scope,$stateParams,goodsDuobao) {

    /*
    * 获取详情
    * */
    $scope.getGoodsDetail=function(){
        $scope.params={
            goodsModuleCode:$stateParams.goodsModuleCode
        }
        goodsDuobao.getDetail($scope.params,function(data){
            $scope.filterOptions=data;
        },function () {
            
        })
    }
    $scope.getGoodsDetail();

    /*
    * 提交修改
    * */
    $scope.updeteDuobaoTemplate=function(opts){
        $scope.getParams();
        var _params = angular.extend({},$scope.params,opts);
        if(_params.index1 == "") delete _params.index1;
        if(!$scope.filterOptions.recommend) $scope.filterOptions.recommend = "n";
        goodsDuobao.editGoods(_params,function (data) {
            history.back()
        },function(){

        })
    }
    /*
    * 取消修改
    * */
    $scope.cancelUpdeteDuobaoTemplate=function(){
        //$scope.getGoodsDetail();
        history.back()
    }
}])