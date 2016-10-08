angular.module('routerApp').factory('account', ["$resource","settings", function ($resource, settings) {
    return $resource(settings.accountUrl + 'user/phone/exist/:phone', {}, {
        exist: {
            method: 'GET'
        },
        login:{
            method: 'POST',
            url: settings.accountUrl + "user/login",
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        logout:{
            method: 'POST',
            url: settings.accountUrl + 'user/logout' + '?time=' + new Date().getTime(),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);