angular.module("routerApp").factory("template",["$resource","settings",function ($resource,settings) {
    return $resource(null,null,{
        add:{
            method:"POST",
            url:settings.mallAdminUrl+"playluckgoods/goods/admin/add",
            params:{
                
            }
        },
        getByModuleCode: {
            method: 'GET',
            url: settings.mallAdminUrl + "playluckgoods/goods/admin/listByGoodsModuleCode"
        },
    })
}])