angular.module('routerApp').controller('mainCtrl', ["$scope", "$stateParams", "$state", "$location", function ($scope, $stateParams, $state, $location) {
    // 分页插件配置参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        perPageOptions: [10, 15, 20, 30, 50]
    };
    /*显示在url里面的参数*/
    $scope.filterOptions = {};
    /*不显示在url里面的参数*/
    $scope.otherOptions = {};

    $scope.params = {};
    $scope.getParams = function () {
        $scope.localPageCfg = {
            pageIndex: $scope.paginationConf.currentPage,
            pageSize: $scope.paginationConf.itemsPerPage
        };
        $scope.nullToEmpty($scope.filterOptions);
        $scope.params = angular.extend({}, $scope.filterOptions, $scope.localPageCfg, $scope.otherOptions);
        $location.search($scope.filterOptions);
    };

    $scope.nullToEmpty = function(obj){
        for(var i in obj){
            if(obj[i] === null){
                obj[i] = "";
            }
        }
        return obj;
    }

    /*路由开始变化的时候执行*/
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (JSON.stringify($scope.otherOptions) != '{}') {
            $scope.otherOptions = {};
        }
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            perPageOptions: [10, 15, 20, 30, 50]
        };
    });
    //改变tab时
    $scope.changeTab = function(item){
        $scope.otherOptions.status = item.status;
        $stateParams.tabStatus = item.status;
        var prefix = $state.$current.url.prefix;
        $location.url(prefix+item.status);
    }

    $scope.initParams = function () {
        $scope.filterOptions = angular.copy($location.search());
        // $scope.paginationConf.currentPage = undefined;
    };

    /*监听 路由变化 当模板解析完成后触发*/
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.initParams();
    });


    /*删除方法*/
    $scope.deleteBtn = true;
    $scope.confirmBtn = false;
    $scope.clickDeleteBtn = function () {
        this.deleteBtn = !this.deleteBtn;
        this.confirmBtn = !this.confirmBtn;
    };
    $scope.clickCancelBtn = function () {
        this.deleteBtn = true;
        this.confirmBtn = false;
    };

    /*
     @日期控件配置
     */
    var vm = $scope.vm = {};
    //初始化日期
    vm.calendar = new Date();
    //弹出式日历触发函数
    vm.open = function (opened, $event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm[opened] = true;
    };
    vm.formats = ['yyyy-MMMM-dd', 'yyyy-MM-dd', 'yyyy.MM.dd', 'shortDate'];
    vm.format = vm.formats[1];

}]);