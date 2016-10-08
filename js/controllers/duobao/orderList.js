angular.module("routerApp").controller("duobaoOrderListCtrl", ["$scope", "$timeout", "$stateParams", "duobaoOrder", "$confirm", "$location", "$state", function ($scope, $timeout, $stateParams, duobaoOrder, $confirm, $location, $state) {

    $('#deliveryBox').on("hide.bs.modal", function (e) {
        $scope.logisticsData = {};
    });
    var timeout;
    $scope.otherOptions.status = $stateParams.tabStatus;

    /*
     * 获取订单列表
     * */
    $scope.getList = function () {
        $scope.getParams();
        $scope.modifyDate();
        duobaoOrder.getList($scope.params, function (data) {
            $scope.setPagingData = data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;
        }, function () {

        })
    }

    //全部订单
    $scope.getAllPagedData = function () {
        delete $scope.otherOptions.status;
        delete $scope.filterOptions.status;
    }
    //条件查询
    $scope.$watch("filterOptions", function (newVal, oldVal) {
        if (newVal != oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getList();
            }, 800);
        }
    }, true)

    $scope.modifyDate = function () {
        if ($scope.params.beginCreatedTime) {
            $scope.params.beginCreatedTime = $scope.params.beginCreatedTime + " 00:00:00";
        }
        if ($scope.params.endCreatedTime) {
            $scope.params.endCreatedTime = $scope.params.endCreatedTime + " 23:59:59";
        }
    }

    $scope.getList();


    //分页监听
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !== 10) {
            $scope.getList();
        }
    }, true);
    //其他条件监听
    $scope.$watch('otherOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getList();
        }
    }, true);

    $scope.showBtn = function (setData) {
        var result = false;
        var canRefundStatus = [3,4,5,6,7];
        for(var i = 0,len = canRefundStatus.length;i < len; i++){
            if($scope.otherOptions.status == canRefundStatus[i]){
                result = true;
            }
        }
        return result;
    };
    $scope.orderStatus = [
        {
            status: 0,
            statusStr: '全部'
        }, {
            status: 1,
            statusStr: '待支付'
        }, {
            status: 2,
            statusStr: '支付处理中'
        }, {
            status: 3,
            statusStr: '等待开奖'
        }, {
            status: 4,
            statusStr: '中奖订单'
        }, {
            status: 5,
            statusStr: '等待发货'
        }, {
            status: 6,
            statusStr: '等待签收'
        }, {
            status: 7,
            statusStr: '已经完成'
        }, {
            status: 8,
            statusStr: '已付款订单超时'
        }, {
            status: 9,
            statusStr: '退款订单'
        }, {
            status: 10,
            statusStr: '异常退款'
        }
    ];

    $scope.logisticsCompany = [
        {
            key: 'SF',
            name: '顺丰快递'
        }, {
            key: 'STO',
            name: '申通快递'
        }, {
            key: 'YTO',
            name: '圆通快递'
        }, {
            key: 'YD',
            name: '韵达快递'
        }, {
            key: 'ZTO',
            name: '中通快递'
        }, {
            key: 'HTKY',
            name: '汇通快递'
        }, {
            key: 'GTO',
            name: '国通快递'
        }, {
            key: 'DBL',
            name: '德邦快递'
        }, {
            key: 'HHTT',
            name: '天天快递'
        }, {
            key: 'EMS',
            name: 'EMS'
        }
    ]
    //快递这边需要一个其他

    $scope.messageType = [
        {name: "参与失败提醒", val: "1"},
        {name: "中奖提醒", val: "2"},
        {name: "兑奖提醒", val: "3"},
        {name: "发货提醒", val: "4"},
        {name: "签收提醒", val: "5"},
        {name: "未中奖提醒", val: "6"},
        {name: "营销短信", val: "7"}
    ]

    /* 退款提示*/
    $scope.showReturnConfirmBox = function (setData, flag) {
        $scope.returnConfirmData = {};
        $scope.orderInfo = {};
        $scope.returnConfirmData.orderCode = setData.orderCode;
        $scope.returnConfirmData.refundType = flag;
        $scope.orderInfo.refundAmount = setData.allGoodsPrice;
        $scope.orderInfo.userName = setData.userName;
    };

    /* 退款 */
    $scope.returnConfirm = function(){
        var text = '是否确认给‘' + $scope.orderInfo.userName + '’退款￥' + $scope.orderInfo.refundAmount + '元么？';
        $confirm({text: text, title: '操作提示', ok: '确定', cancel: '取消'}).then(function () {
            duobaoOrder.returnConfirm({}, $scope.returnConfirmData, function (data) {
                if(data.refund_type === "form"){
                    var hf = data.form_body;
                    //document.write(hf);
                    //var html = "<form action='http://www.baidu.com' name='duForm' method='get'></form><script>console.log(document.forms['duForm']);document.forms['duForm'].submit();</script>"
                    var newWindow = window.open('','','fullscreen=yes');
                    newWindow.document.write(hf);
                }
                $scope.getList();
                $("#returnConfirmBox").modal("hide");
                alert('操作成功！')
            })
        });

        /*$confirm({text: text, title: '操作提示', ok: '确定', cancel: '取消'}).then(function(){
            
            //发请求，返回data
            var data = {
                refund_type: 'form'
            }
            if(data.refund_type === "form"){
                //打开确认支付成功弹框
                $confirm({text: '是否已完成支付', title: '操作提示', ok: '支付完成', cancel: '支付取消'}).then(function(){
                    alert("支付成功");
                })
                var html = "<form action='http://www.baidu.com' name='duForm' method='get'></form><script>console.log(document.forms['duForm']);document.forms['duForm'].submit();</script>"
                var newWindow = window.open('','','fullscreen=yes');
                newWindow.document.write(html);
            }else{

            }
            $scope.getList();
            $("#returnConfirmBox").modal("hide");
        })*/
    }
    
    /*发货*/
    $scope.showDeliveryBox = function (setData, index) {
        $scope.logisticsData = {};
        $scope.index = index;
        $scope.isMaterial = setData.goodsType === "MATERIAL" ? true : false;
        $scope.deliveryData = {};
        $scope.deliveryData.goodsCode = setData.goodsCode;
        $scope.deliveryData.period = setData.period;
    }

    $scope.sendDelivery = function () {
        var _params = angular.extend({}, $scope.deliveryData, $scope.logisticsData);

        duobaoOrder.sendDelivery(_params, function (data) {
            alert("发货成功！");
            $scope.getList();
            $("#deliveryBox").modal("hide");
        }, function () {
            alert("发货失败！");
            $("#deliveryBox").modal("hide");
        })
    }

    /*获取物流信息*/
    $scope.getLogisticsData = function (setData) {
        $scope.logisticData = {};
        $scope.logistics = {};
        duobaoOrder.getOrderDetail({orderCode: setData.orderCode}, function (data) {
            $scope.logisticData = data;
            var params = {
                logisticCode: data.logisticsNo,
                companyCode: data.logisticsName
            };
            var _params = $.param(params)
            duobaoOrder.getLogisticsInfo(params, _params, function (_data) {
                $scope.logistics = _data;
            }, function () {
                $scope.logistics.traces = [];
            })
        }, function () {

        })
    };

}])