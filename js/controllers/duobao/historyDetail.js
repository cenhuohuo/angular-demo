angular.module("routerApp").controller("historyDetailCtrl",["$scope","$stateParams","goodsDuobao",function ($scope,$stateParams,goodsDuobao) {

    $scope.getHisDetail=function () {
        var _param = {
            goodsCode:$stateParams.goodsCode,
            period:$stateParams.period
        }
        goodsDuobao.getHistoryDetail(_param,function(data){
            $scope.gInfo = data;
        },function(){

        })
    }
    $scope.getHisDetail();
     
}])