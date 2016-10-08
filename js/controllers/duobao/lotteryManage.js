
angular.module("routerApp").controller("lotteryManageCtrl",["$scope","$timeout","lotteryManage","$confirm","$stateParams",function($scope,$timeout,lotteryManage,$confirm,$stateParams){

  $scope.otherOptions.status = $stateParams.tabStatus;

   $scope.getList=function(){
       $scope.getParams();
       $scope.modifyDate();
       lotteryManage.getList($scope.params,function(data){
            $scope.setPagingData=data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;
       },function () {
           $scope.paginationConf.totalItems = 0;
       })
   }
   $scope.modifyDate = function(){
       if($scope.params.startTime){
           $scope.params.startTime = $scope.params.startTime + " 00:00:00";
       }
       if($scope.params.endTime){
           $scope.params.endTime = $scope.params.endTime + " 23:59:59";
       }
   }
  $scope.getList();

  $scope.prizeStatus = [
    {status: 0,statusStr: "全部商品"},
    {status: 1,statusStr: "待开奖"},
    {status: 2,statusStr: "已开奖"},
  ];
/*
  短信接口需要下个版本。
  $scope.messageType = [
    {name:"参与失败提醒",val:"1"},
    {name:"中奖提醒",val:"2"},
    {name:"兑奖提醒",val:"3"},
    {name:"发货提醒",val:"4"},
    {name:"签收提醒",val:"5"},
    {name:"未中奖提醒",val:"6"},
    {name:"营销短信",val:"7"}
  ]*/

  $scope.showMessageBox = function(setData){
    $scope.messageData = {};
    $scope.messageData.accteptPhone = setData.accteptPhone;
  }

  $scope.messageConfirm = function(){
    $confirm({text: "请仔细校验短信内容编辑是否无误,点击确定短信发出", title: '操作提示', ok: '确定', cancel: '取消'}).then(function () {
      //接口还不知道
      order.returnConfirm({}, $scope.messageData, function (data) {
          $scope.getList();
          alert('发送成功！');
          $('#messageModal').modal('hide');
      })
    });
  }

    var timeout;
    /*查询条件监听*/
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getList();
            }, 800);
        }
    }, true);


    /*分页条件监听*/
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !==10) {
            $scope.getList();
        }
    }, true);

    /*其他条件监听*/
    $scope.$watch('otherOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getList();
        }
    }, true);
}])