angular.module('routerApp').factory('session',["$location", function ($location) {
    var wrap = false;
    var absUrl = $location.absUrl();
    if (absUrl.indexOf('elife_wrap') != -1) {
        wrap = true;
    }

    function hasWrap() {
        return wrap;
    }

    function getUserName() {
        return window.sessionStorage.getItem(this.moduleName + 'User_name');
    }

    function getUserPhone() {
        return window.sessionStorage.getItem(this.moduleName + 'User_phone');
    }

    function getUserAuthority() {
        return window.sessionStorage.getItem(this.moduleName + 'User_authority');
    }

    function setUserName(name) {
        window.sessionStorage.setItem(this.moduleName + 'User_name', name);
    }

    function setUserPhone(phone) {
        window.sessionStorage.setItem(this.moduleName + 'User_phone', phone);
    }

    function setUserAuthority(authority) {
        window.sessionStorage.setItem(this.moduleName + 'User_authority', authority)
    }

    function clear() {
        window.sessionStorage.removeItem(this.moduleName + 'User_phone');
        window.sessionStorage.removeItem(this.moduleName + 'User_name');
        window.sessionStorage.removeItem(this.moduleName + 'User_authority');
    }

    return {
        moduleName: 'mall',
        hasWrap: hasWrap,
        getUserName: getUserName,
        getUserPhone: getUserPhone,
        getUserAuthority: getUserAuthority,
        setUserName: setUserName,
        setUserPhone: setUserPhone,
        setUserAuthority: setUserAuthority,
        clear: clear
    }

}]);