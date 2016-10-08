angular.module('demoApp').factory('httpInterceptors', ['$rootScope', "$q", "$location", function ($rootScope, $q, $location) {
    return {
        request: function (config) {
            config.headers['X-API-Version'] = 'web-browser-1.0.0';
            return config || $q.when(config);
        },
/*        response: function (response) {
            return response || $q.when(response);
         },
         requestError: function (reqError) {
             console.log('requestError:' + reqError);
             return reqError;
         },*/
        responseError: function (resError) {
            if (resError.status == 401) {
                $location.path('/index');
            } else if (resError.status == 500) {
                alert('服务器错误！！！500')
            } else if (resError.status == 502) {
                alert('服务器正在重启！！！502')
            } else if (resError.status == 403){
                console.log("您没有这个权限!");
            }
            return $q.reject(resError);
        }
    }
}]);