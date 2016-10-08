
angular.module("routerApp").factory("prizeUser",["$resource","settings",function($resource,settings){
    return $resource(null,null,{
        /*中奖人列表*/
        getList:{
            method:"GET",
            url:settings.mall+'playluckorder/admin/prize/prizeUser/list'
        },
        /*中奖人详情*/
        getDetail:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/prize/prizeUser/detail"
        },
        /*购买记录*/
        getFlowList:{
            method: "GET",
            url: settings.mall+"playluckorder/admin/prize/prizeUser/playluckFlowList"
        }
    })
}])