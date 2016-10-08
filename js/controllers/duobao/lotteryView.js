
angular.module("routerApp").controller("lotteryViewCtrl",["$scope","$stateParams","lotteryManage",function ($scope,$stateParams,lotteryManage) {

    $scope.getPreview=function () {
        $scope.params={
            goodsCode:$stateParams.goodsCode,
            period:$stateParams.period
        };
        lotteryManage.preview($scope.params,$scope.params,function(data){
            $scope.goodsName = data.prizeUser.goodsDto.goodsName;
            $scope.goodsThumbnailUrl = data.prizeUser.goodsDto.goodsThumbnailUrl;
            $scope.goodsName=data.prizeUser.goodsDto.goodsName;
            $scope.luckNumber=data.luckNumber;
            $scope.userName=data.prizeUser.userDto.userName;
            $scope.userPhone=data.prizeUser.userDto.userPhone;
            $scope.allGoodsPrice=data.prizeUser.goodsDto.allGoodsPrice;
            $scope.period=data.prizeUser.goodsDto.period;
            $scope.goodsSumCount=data.prizeUser.goodsDto.goodsSumCount;
            $scope.goodsCount=data.prizeUser.goodsDto.goodsCount;
            // $scope.leftCount = $scope.goodsSumCount - $scope.goodsCount;
            $scope.leftCount = 0;
            $scope.lotteryNumberList = data.prizeUser.lotteryNumberList;
        },function(){

        })
    }
    $scope.getPreview();

    $scope.confirmLottery=function(){
        $scope.params={
            goodsCode:$stateParams.goodsCode,
            period:$stateParams.period
        }
        lotteryManage.prize($scope.params,$scope.params,function () {
            alert("开奖成功！");
            history.back();
        },function(){
            alert("开奖失败！");
        })
    }
}]).controller("lotteryRecordCtrl",["$scope","$stateParams","goodsDuobao",function($scope,$stateParams,goodsDuobao){
    $scope.getRecord = function(){
        var _param = {
            goodsCode:$stateParams.goodsCode,
            period:$stateParams.period
        }
        goodsDuobao.getHistoryDetail(_param,function(data){
            $scope.gInfo = data;
        })
    }

    $scope.getRecord();
}])