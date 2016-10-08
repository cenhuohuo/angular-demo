angular.module('routerApp').factory('service', ["$resource","settings", function ($resource,settings) {
    return $resource(settings.mallAdminUrl + 'logistictrace', null, {
        getByCode: {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);