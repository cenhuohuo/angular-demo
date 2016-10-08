angular.module('routerApp').directive('headerBar', ["$confirm", "$location", "session", "account", function ($confirm, $location, session, account) {
    return {
        restrict: 'EA',
        template: '<div class="header">' +
        '<h1>' +
            '<a>嗨玩后台管理系统</a>' +
        '</h1>' +
        '<div class="loginUser top-menu">' +
            '<ul class="nav navbar-nav">' +
                /*'<li class="dropdown dropdown-extended dropdown-notification">'+
                    '<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
                    '<i class="icon-bell"></i>'+
                    '<span class="badge badge-default"> 26 </span>'+
                    '</a>'+
                    '<ul class="dropdown-menu">'+
                        '<li class="external">'+
                            '<h3><span class="bold">26 条待处理</span> 消息</h3>'+
                        '</li>'+
                        '<ul class="dropdown-menu-list scroller" data-handle-color="#637283">'+
                            '<li>'+
                                '<a href="javascript:;">'+
                                    '<span class="time">20</span>'+
                                    '<span class="details">'+
                                        '<span class="label label-sm label-icon label-warning">'+
                                            '<i class="icon icon-bell"></i>'+
                                        '</span>嗨玩商品已筹满待开奖！'+
                                    '</span>'+
                                '</a>'+
                            '</li>'+
                            '<li>'+
                                '<a href="javascript:;">'+
                                    '<span class="time">3</span>'+
                                    '<span class="details">'+
                                        '<span class="label label-sm label-icon label-warning">'+
                                            '<i class="icon icon-bell"></i>'+
                                        '</span>嗨玩商品待发货订单！'+
                                    '</span>'+
                                '</a>'+
                            '</li>'+
                            '<li>'+
                                '<a href="javascript:;">'+
                                    '<span class="time">3</span>'+
                                    '<span class="details">'+
                                        '<span class="label label-sm label-icon label-warning">'+
                                            '<i class="icon icon-bell"></i>'+
                                        '</span>嗨玩商品中奖快过期！'+
                                    '</span>'+
                                '</a>'+
                            '</li>'+
                        '</ul>'+
                    '</ul>'+
                '</li>'+*/
                '<li>' +
                    '<a>' +
                    '<i class="icon-user"></i>' +
                    '<span>欢迎您，{{loginName}}</span>' +
                    '</a>' +
                '</li>' +
                '<li class="loginOut" ng-click="loginOut()">' +
                    '<a>' +
                    '<i class="icon-share-alt"></i>' +
                    '<span>{{loginOutBtn}}</span>' +
                '</a>' +
                '</li>' +
            '</ul>' +
        '</div>' +
        '</div>',
        replace: true,
        link: function (scope) {
            scope.loginName = session.getUserName();
            if (session.hasWrap()) {
                scope.loginOutBtn = '返回上一级';
            }
            else {
                scope.loginOutBtn = '退出系统';
            }
            scope.loginOut = function () {
                if (session.hasWrap()) {
                    window.location.href = '/elife_wrap/#/authority';
                    session.clear();
                }
                else {
                    $confirm({text: '确定要退出了嘛？', title: scope.loginName, ok: '退出', cancel: '再看看'}).then(function () {
                        account.logout({}, null, function (data) {
                            session.clear();
                            $location.search('');
                            $location.path('index');
                        });
                    });
                }
            }
        }
    }
}]);