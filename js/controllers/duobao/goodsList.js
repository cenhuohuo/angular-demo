angular.module("routerApp").controller('goodsListCtrl', ["$scope", "$timeout", "goodsDuobao", function ($scope, $timeout, goodsDuobao) {

    $scope.activeTab = 1;
    $('#useTemplate').on("hide.bs.modal", function (e) {
        $scope.periodNumber = "";
    });
    $('#offGoods').on("hide.bs.modal", function (e) {
        $scope.comment = "";
    });
    /*
     * 获取模板列表
     * */
    $scope.getTemplateList = function () {
        $scope.activeTab = 1;
        $scope.getParams();
        $scope.modifyDate();
        goodsDuobao.getList($scope.params, $scope.params, function (data) {
            $scope.setPagingData_one = data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;

        }, function () {

        })
    }
    /*
     * 获取已上架商品
     * */
    $scope.getPutawayGoodsList = function () {
        $scope.activeTab = 2;
        $scope.getParams();
        $scope.modifyDate();
        goodsDuobao.getPutawayGoodsList($scope.params, $scope.params, function (data) {
            $scope.setPagingData_two = data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;
        }, function () {

        })
    }
    /*获取人气商品*/
    $scope.getRecommendGoodsList = function () {
        $scope.activeTab = 5;
        $scope.getParams();
        $scope.modifyDate();

    }

    /*获取已下架商品*/
    $scope.getUndercarriageGoodsList = function () {
        $scope.activeTab = 3;
        $scope.getParams();
        $scope.modifyDate();
        goodsDuobao.getUndercarriageGoodsList($scope.params, $scope.params, function (data) {
            $scope.setPagingData_three = data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;
        }, function () {

        })
    }
    /* 获取已售完商品 */
    $scope.getSoldOutGoodsList = function () {
        $scope.activeTab = 4;
        $scope.getParams();
        $scope.modifyDate();
        goodsDuobao.getSoldOutGoodsList($scope.params, $scope.params, function (data) {
            $scope.setPagingData_four = data.list;
            $scope.paginationConf.totalItems = data.pageInfoDto.total;
        }, function () {

        })
    }

    $scope.modifyDate = function () {
        if ($scope.params.startDate) {
            $scope.params.startDate = $scope.params.startDate + " 00:00:00";
        }
        if ($scope.params.endDate) {
            $scope.params.endDate = $scope.params.endDate + " 23:59:59";
        }
    }

    //使用模板
    $scope.useTempate = function (goodsModuleCode, goodsName) {
        $scope.submintUseTempalte = function () {
            var confirmSubmit = confirm("是否确认商品'" + goodsName + "'上架" + $scope.periodNumber + "期")
            if (confirmSubmit) {
                $scope.paramsData = {
                    periodNumber: $scope.periodNumber,
                    goodsModuleCode: goodsModuleCode
                }
                goodsDuobao.putaway(null, $.param($scope.paramsData), function (data) {

                }, function () {

                })
                $("#useTemplate").modal("hide");

            }
        }
    }
    //获取已发布模板
    $scope.getTemplateList();

    //分页监听
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !== 10) {
            var goodIndex = $(".nav-tabs").find(".active").index();
            if (goodIndex == 1) {
                $scope.getPutawayGoodsList();
            } else if (goodIndex == 2) {
                $scope.getUndercarriageGoodsList();
            } else if (goodIndex == 0) {
                $scope.getTemplateList();
            } else if (goodIndex == 3) {
                $scope.getSoldOutGoodsList();
            }
        }
    }, true);

    /*查询条件监听*/
    var timeout;
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                var goodIndex = $(".nav-tabs").find(".active").index();
                ;
                if (goodIndex == 1) {
                    $scope.getPutawayGoodsList();
                } else if (goodIndex == 2) {
                    $scope.getUndercarriageGoodsList();
                } else if (goodIndex == 0) {
                    $scope.getTemplateList();
                } else if (goodIndex == 3) {
                    $scope.getSoldOutGoodsList();
                }
            }, 800);
        }
    }, true);

    /*
     * 商品下架
     * */
    $scope.offGoods = function (goodsCode) {
        $scope.submitOffGoods = function () {
            var _params = {
                goodsCode: goodsCode,
                comment: $scope.comment
            };
            goodsDuobao.undercarriage(_params, function () {
                $scope.getPutawayGoodsList();
                $("#offGoods").modal("hide");
            }, function () {

            })
        }
    }
    /*
     * 更改商品序号
     * */
    $scope.editIndex = function (setData) {
        $scope.goodsInfo = {
            goodsCode: setData.goodsCode,
            index1: setData.index1
        }
    }

    $scope.updateIndex = function () {
        goodsDuobao.updateIndex($scope.goodsInfo, function () {
            $scope.getPutawayGoodsList();
            $("#editIndex").modal("hide");
            alert('操作成功!')
        }, function () {

        })
    }

    $scope.isRecommends = [
        {
            key: 'y',
            value: '人气推荐'
        },
        {
            key: 'n',
            value: '非人气推荐'
        }
    ]
}])