
angular.module('routerApp').directive('icons', function () {
    return {
        scope: {
            moduleIcon: '='
        },
        restrict: 'EA',
        replace: true,
        templateUrl: 'tpls/template/icons.html',
        link: function (scope, element, attrs) {
            element.find('ul').on('click', 'li', function () {
                scope.$apply(scope.moduleIcon = $(this).find('li').context.innerText);
            });
        }
    }
});