angular.module("routerApp").factory("advertise",["$resource","settings",function ($resource,settings) {
    return $resource(null,null,{
        getList:{
            method:"GET",
            url:settings.mall+"playluckadvertadmin/advert/admin"
        },
        getById: {
            method: 'GET',
            url:settings.mall+"playluckadvertadmin/advert/admin/:advertId"
        },
        add: {
            method: 'POST',
            //url: settings.mall + 'playluckadvertadmin/advertise/add:advertiseId'
        },
        delete: {
            method: 'DELETE'
        },
        update: {
            method: 'PUT',
            url:settings.mall+"playluckadvertadmin/advert/admin/:advertId"
        }
    })
}])