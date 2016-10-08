angular.module('demoApp').directive('navExp', [function () {
    return {
        restrict: 'AE',
        template: 
        '<ul>'+
            '<li ng-repeat="item in navItems">'+
                '<a ui-sref="{{item.ref}}" target="{{item.target}}">{{item.content}}</a>'+
            '</li>'+
        '</ul>',
        replace: true,
        link: function (scope, element, attrs) {
            scope.navItems = [
                {
                    ref: "index",
                    content: "登录页"
                },
                {
                    ref: "main.first",
                    content: "first页"
                },
                {
                    ref: "main.second",
                    content: "second页"
                }
            ]
        }
    }
}]);