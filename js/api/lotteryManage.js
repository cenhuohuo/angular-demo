angular.module("routerApp").factory("lotteryManage",["$resource","settings",function($resource,settings){
    return $resource(null,null,{
        getList:{
            method:"GET",
            url:settings.mall+"playluckorder/admin/prize/list"
        },
        //开奖预览详情
        preview:{
            method:"POST",
            url:settings.mall+"playluckorder/admin/prize/preview"
        },
        //开奖
        prize:{
            method:"POST",
            url:settings.mall+"playluckorder/admin/prize"
        }
    })
}])