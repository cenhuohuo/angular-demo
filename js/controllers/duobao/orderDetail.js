
angular.module("routerApp").controller("duobaoOrderDetailCtrl",["$scope","$stateParams","duobaoOrder",function ($scope,$stateParams,duobaoOrder) {

    $scope.code = $stateParams.orderCode;
    $scope.orderStatus = $stateParams.orderStatus;
    $scope.rInfo = "";
    // $scope.goodsCode = $stateParams.goodsCode;
    // $scope.period = $stateParams.period;
    /*
     * 订单详情
     * */
    $scope.getDetail=function(){
        duobaoOrder.getDetail({orderCode:$scope.code},function(data){
            $scope.gInfo = data;
        },function(){

        })
    }
    $scope.getDetail();
    //购买人信息
    $scope.getUserDetail=function(){
        duobaoOrder.getUserDetail({orderCode:$scope.code},function (data) {
            $scope.cInfo = data;
        },function (res) {
            $scope.cInfoError = res.data.error;
        })
    }
    $scope.getUserDetail();
    //兑奖信息
    $scope.getExpiryDetail = function(){
        duobaoOrder.getExpiryDetail({orderCode: $scope.code},function(data){
            $scope.eInfo = data;
        },function(){

        })
    }
    $scope.getExpiryDetail();
    //退款信息
    $scope.getRefund = function(){
        duobaoOrder.getRefundDetail({orderCode: $scope.code},function(data){
            $scope.rInfo = data;
        },function(){

        })
    }
    if($scope.orderStatus == 8 || $scope.orderStatus == 7){
        $scope.getRefund();
    }
/*    $scope.getOrderDetail=function () {
        duobaoOrder.getOrderDetail({orderCode:$stateParams.orderCode},function (data) {

        },function () {

        })
    }
    $scope.getOrderDetail();*/
}])