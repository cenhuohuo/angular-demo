
angular.module("routerApp")
    .controller("operationManageCtrl",["$scope","maintenance",function ($scope,maintenance) {

    $scope.getConNavData = function () {
        maintenance.getModuleList({}, function (data) {
            $scope.setConNavData = data.infos;
        })
    };
    $scope.getConNavData();
    ///添加内容管理栏目的数据
    $scope.add = function (conNavData) {
        maintenance.addModule(null, conNavData, function (data) {
            $scope.getConNavData();
            alert("添加成功!");
        },function(data){
            alert("添加失败!");
        });
    };
    $scope.deleteNavData = function (uid, conNavData) {
        maintenance.deleteModule({moduleId: uid}, null, function () {
            $scope.getConNavData();
            alert("删除成功!");
        }, function (data) {
            alert(data.data.error.description);
        });
    };
    $scope.updateNavData = function (uid, conNavData) {
        maintenance.updateModule({moduleId: uid}, conNavData, function () {
            $scope.getConNavData();
        })
    }

}]).controller('conManageMainCtrl', ["$scope", "$stateParams", "$timeout", "$location", "tools", "maintenance", function ($scope, $stateParams, $timeout, $location, tools, maintenance) {

    // 分页插件配置参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10
    };
    $scope.setPagingData=[];
    var timeout;
    $scope.getList = function () {
        $scope.getParams();
        $scope.params.moduleType = $stateParams.path;
        maintenance.getArticleList($scope.params, function (data) {
            $scope.setPagingData = data.infos;
            $scope.paginationConf.totalItems = data.total;
        })
    };
    $scope.getList();

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                $scope.getList();
            }, 800);
        }
    }, true);
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== 10 && oldVal !==10) {
            $stateParams.page = $scope.paginationConf.currentPage;
            $scope.getList();
            //$location.path('main/duobao/operationManage/list/' + $stateParams.path + '/' + $scope.paginationConf.currentPage+"?pageCount="+$scope.paginationConf.itemsPerPage);
        }
    }, true);
    /*添加文章*/
    $scope.addArticleList = function (articleListData) {
        articleListData.updateDate = tools.getCurrentTime();
        maintenance.addArticle({moduleType: $stateParams.path}, articleListData, function (data) {
            articleListData.articleId = data.articleId;
            articleListData.moduleType = data.moduleType;
            // $scope.setPagingData.unshift(angular.copy(articleListData));
            $scope.getList();
            $scope.paginationConf.totalItems = $scope.paginationConf.totalItems + 1;
            articleListData.articleTitle = articleListData.articleContent = '';
            alert('添加成功！')
        })
    };
    /*删除文章*/
    $scope.deleteArticleList = function (articleId, ngGridData) {
        maintenance.deleteArticle({articleId: articleId}, null, function (data) {
            $scope.getList();
        })
    };

}]) .controller('articleViewCtrl', ["$scope", "$stateParams", "$sce", "maintenance", function ($scope, $stateParams, $sce, maintenance) {
    /*获取文章详细内容*/
    $scope.getArticleViewData = function () {
        maintenance.getArticleById({articleId: $stateParams.id}, function (data) {
            $scope.setArticleViewData = data;
            $scope.setArticleViewData.contentView = $sce.trustAsHtml(data.articleContent);
        });
    };
    $scope.getArticleViewData();
    /*@修改文章详细内容*/
    $scope.updateArticleViewData = function (setArticleViewData) {
        setArticleViewData.articleContent = setArticleViewData.articleContent.replace(/\"/g, "'");
        maintenance.updateArticle({articleId: $stateParams.id}, setArticleViewData, function (data) {
            alert("修改成功！")
            history.back();
        })
    }
}]);