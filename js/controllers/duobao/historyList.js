
angular.module("routerApp").controller("historyListCtrl",["$scope","$stateParams","goodsDuobao",function($scope,$stateParams,goodsDuobao){

    /*
    * 获取往期列表
    * */
    $scope.goodsCode=$stateParams.goodsCode;
    $scope.getList=function(){
        $scope.getParams();
        var _params = angular.extend({},$scope.params,{goodsCode:$scope.goodsCode})
        goodsDuobao.getHistoryList(_params,function(data){
            $scope.goodInfo = data;
            $scope.prizeHistoryList = data.prizeHistoryList.list;
            angular.forEach($scope.prizeHistoryList, function(v,k){
                v.prizeTime = v.prizeTime == 0 ? null : v.prizeTime;
            })
            $scope.paginationConf.totalItems=data.prizeHistoryList.pageInfoDto.total;
        },function(){

        })
    }
    $scope.getList();
}])