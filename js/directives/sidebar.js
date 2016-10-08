angular.module('routerApp').directive('sidebar', [function () {
    return {
        restrict: 'AE',
        template: '' +
        '<div class="leftNav">' +
        '<ul>' +
        '<li ng-repeat="nav in navList">' +
        '<div class="number">{{nav.items.length}}</div>' +
        '<div ng-click="toggle($index)">' +
        '<i class="{{nav.menuIcon}}"></i>{{nav.title}}' +
        '</div>' +
        '<ul class="menu">' +
        '<li ng-repeat="item in nav.items" ng-click="active($event.target)">' +
        '<a ui-sref="{{item.url}}">' +
        '<i class="icon-caret-right"></i>{{item.title}}' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>',
        replace: true,
        link: function (scope, element, attrs) {
            scope.toggle = function (index) {
                element.children().children().eq(index).toggleClass('open');
            };
            scope.active = function (target) {
                element.find('li').removeClass('active');
                $(target).parent().addClass('active');
            };

            scope.duobao = {
                title: "嗨玩管理",
                menuIcon: 'icon-laptop',
                items: [
                    {
                        title: "发布模板",
                        url: "main.duobao.template"
                    },
                    {
                        title:"商品列表",
                        url:"main.duobao.goodsList"
                    },
                    {
                        title:"开奖管理",
                        url:"main.duobao.lotteryManage({tabStatus:0})"
                    },
                    {
                        title:"中奖人管理",
                        url:"main.duobao.prizeUser"
                    },
                    {
                        title:"订单列表",
                        url:"main.duobao.orderList({tabStatus:0})"
                    },{
                        title:"运营管理",
                        url:"main.duobao.operationManage"
                    },{
                        title:"广告管理",
                        url:"main.duobao.AdManage"
                    }
                ]
            };
            scope.navList = [];
            scope.navList.push(scope.duobao);
        }
    }
}]);