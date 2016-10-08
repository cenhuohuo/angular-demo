angular.module('demoApp').filter('activityStatus', [function () {
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
}])
