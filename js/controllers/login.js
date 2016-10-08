angular.module('routerApp').controller('loginCtrl', ["$scope", "$location", "session", "account", function ($scope, $location, session, account) {
    $scope.login = function () {
        account.login({}, $.param($scope.loginData), function (data) {
            session.setUserName('超级管理员');
            session.setUserPhone($scope.loginData.phone);
            $location.path('main/duobao/template');
        }, function (data) {
            var status = " 状态码：" + data.status;
            $scope.showError = true;
            $scope.error_description = data.data.error ? data.data.error.description+status || '服务器挂了！！'+status : '服务器挂了！！'+status;
        });
    };
}]);