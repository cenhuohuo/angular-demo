angular.module('routerApp').filter('activityStatus', [function () {
    return function (input) {
        return {
            0: '隐藏',
            1: '显示'
        }[input]
    }
}]).filter('logisticsName', [function () {
    return function (input) {
        return {
            "SF": "顺丰快递",
            "STO": "申通快递",
            "YTO": "圆通快递",
            "YD": "韵达快递",
            "ZTO": "中通快递",
            "HTKY": "汇通快递",
            "GTO": "国通快递",
            "DBL": "德邦快递",
            "HHTT": "天天快递",
            "EMS": "EMS"
        }[input]
    }
}]).filter('lotteryStatus',[function(){
    return function(input){
        return {
            "0":"未开奖",
            "1":"未中奖",
            "2":"未兑奖",
            "3":"已兑奖",
            "4":"中奖，已退款"
        }[input]
    }
}]).filter("prizeStatus",[function(){
    return function(input){
        return {
            "1":"未开奖",
            "2":"已开奖"
        }[input]
    }
}]).filter("orderStatus",[function(){
    return function (input) {
        return {
            "0":"未付款",
            "1":"已付款",
            "2":"待发货",
            "3":"待收货",
            "4":"已收货",
            "5":"中奖已过期",
            "6":"已付款，订单超时",
            "7":"退款中",
            "8":"已退款"
        }[input]
    }
}]).filter("goodsType",[function () {
    return function (input) {
        return{
            "VIRTUAL":"虚拟商品",
            "MATERIAL":"实物商品"
        }[input]
    }
}]).filter("payWay",[function () {
    return function (input) {
        return{
            "alipay":"支付宝",
            "lianlian":"连连支付"
        }[input]
    }
}]).filter("toStr",[function(){
    return function(input){
        input = input || "";
        return input.toString();
    }
}])
