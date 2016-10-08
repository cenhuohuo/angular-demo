
angular.module("routerApp").factory("duobaoOrder",["$resource","settings",function ($resource,settings) {
    return $resource(null,null,{
        getList:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/playluckFlow"
        },
        //订单详情-中奖信息
        getDetail:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/playluckFlow/detail/prize"
        },
        //订单详情-购买人信息
        getUserDetail:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/playluckFlow/detail/user"
        },
        //订单详情-兑奖信息
        getExpiryDetail:{
            method: "GET",
            url: settings.mall + "playluckorder/admin/playluckFlow/detail/expiry"
        },
        //订单详情-物流信息
        getOrderDetail:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/playluckFlow/detail/logistics"
        },
        //退款信息
        getRefundDetail:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/playluckFlow/detail/refund"
        },
        //获取具体物流信息
        getLogisticsInfo:{
            method:"POST",
            url:settings.mall+"logistictrace",
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        //发货
        sendDelivery:{
            method:"PUT",
            url:settings.mall+"playluckorder/admin/prize/send"
        },
        returnConfirm:{
            method: "POST",
            url: settings.mall+"playluckorder/admin/order/refund",
        }
    })
}])