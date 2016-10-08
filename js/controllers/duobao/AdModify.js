angular.module("routerApp").controller("duobaoModifyAdCtrl",["$scope","$stateParams","advertise",function ($scope,$stateParams,advertise) {

    $scope.getAdvertiseData = function () {
        advertise.getById({advertId: $stateParams.id}, function (data) {
            $scope.setAdvertiseData = data;
        })
    };
    $scope.getAdvertiseData();

    $scope.updateAdvertiseData = function (data) {
        advertise.update({advertId: $stateParams.id}, angular.copy(data), function (data) {
            alert('修改成功！');
            history.back();
        });
    }
}])