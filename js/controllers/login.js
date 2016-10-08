angular.module('demoApp').controller('loginCtrl', ["$scope", "$location", "account", function ($scope, $location, account) {
    $scope.login = function () {
        account.login({}, $.param($scope.loginData), function (data) {
            $location.path('');
        }, function (data) {
            var status = " 状态码：" + data.status;
            $scope.showError = true;
            $scope.error_description = data.data.error ? data.data.error.description+status || '服务器挂了！！'+status : '服务器挂了！！'+status;
        });
    };
}]);