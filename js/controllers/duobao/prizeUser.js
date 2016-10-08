
angular.module("routerApp").controller("prizeUserCtrl",["$scope","$timeout","$stateParams","prizeUser",function ($scope,$timeout,$stateParams,prizeUser) {

    /*
    * 获取中奖人列表
    * */
    $scope.getList=function () {
        $scope.getParams();
        prizeUser.getList($scope.params,function(data){
            $scope.setPagingData=data.list;
            $scope.paginationConf.totalItems=data.pageInfoDto.total;
        },function(){
            $scope.paginationConf.totalItems=0;
        })
    }
    $scope.getList();
    //分页监听
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !==10) {
            $scope.getList();
        }
    }, true);

    /*查询条件监听*/
    var timeout;
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getList();
            }, 800);
        }
    }, true);


}]).controller("prizeUserDetailCtrl",["$scope","$stateParams","prizeUser","$timeout",function($scope, $stateParams, prizeUser, $timeout){

    $scope.activeTab = 1;
    $scope.otherOptions.status = 0;

    /*中奖人详情*/
    $scope.getDetail=function () {
        prizeUser.getDetail({userId:$stateParams.userId},function(data){
            $scope.userName=data.userName;
            $scope.userPhone=data.userPhone;
            $scope.usualUserIp=data.usualUserIp;
            $scope.totalGoodsCountSum=data.totalGoodsCountSum;
            $scope.totalWinPrizeCount=data.totalWinPrizeCount;
            $scope.usualIpAddress = data.usualIpAddress;
            $scope.setPagingData1=data.ipDtoList;
            $scope.setPagingData2=data.acceptAddressDtoList;
        },function(){

        })
    }

    $scope.getFlowList = function(){
        $scope.getParams();
        $scope.modifyDate();
        var _params = angular.extend({},$scope.params,{userId:$stateParams.userId});
        prizeUser.getFlowList(_params,function(data){
            $scope.setPagingData = data.list;
            $scope.paginationConf.totalItems=data.pageInfoDto.total;
        })
    }

    $scope.modifyDate = function(){
        if($scope.params.beginCreatedTime){
            $scope.params.beginCreatedTime = $scope.params.beginCreatedTime + " 00:00:00";
        }
        if($scope.params.endCreatedTime){
            $scope.params.endCreatedTime = $scope.params.endCreatedTime + " 23:59:59";
        }
    }

    //分页监听
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !==10) {
            $scope.getFlowList();
        }
    }, true);

    //其他条件监听
    $scope.$watch('otherOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getFlowList();
        }
    }, true);

    /*查询条件监听*/
    var timeout;
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getFlowList();
            }, 800);
        }
    }, true);
    
    $scope.getDetail();
    $scope.getFlowList();
}])