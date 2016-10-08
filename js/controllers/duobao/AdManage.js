angular.module("routerApp").controller("advertisementCtrl",["$scope","advertise","$location","$stateParams","$timeout","Lightbox",function ($scope,advertise,$location,$stateParams,$timeout,Lightbox) {

    $scope.getAdvertiselist=function () {
        $scope.getParams();
        advertise.getList($scope.params,function(data){
            $scope.setPagingData=data.list;
            $scope.paginationConf.totalItems=data.pageInfoDto.total;
        },function () {
            $scope.paginationConf.totalItems=0;
        });
    }
    $scope.getAdvertiselist();
    var timeout;
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getAdvertiselist();
            }, 800);
        }
    }, true);
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !==10) {
            $stateParams.page = $scope.paginationConf.currentPage;
            $scope.getAdvertiselist();
            //$location.path('main/operation/advertisement/' + $scope.paginationConf.currentPage);
        }
    }, true);


    /*Lightbox*/
    $scope.openLightboxModal = function (x, index) {
        Lightbox.openModal($scope.setPagingData[x], index);
    };
}])