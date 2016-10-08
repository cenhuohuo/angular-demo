angular.module('demoApp')
    .run(["$rootScope", "$state", "$stateParams","settings", function ($rootScope, $state, $stateParams,settings) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]).config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpInterceptors');

    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
        url: '/index',
        templateUrl: 'views/login.html'
    }).state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
    }).state('main.first', {
        url: '/first',
        views: {
            'maingrid@main':{
                templateUrl: 'views/firstPage.html'
            }
        }
    }).state('main.second', {
        url: '/second',
        views: {
            'maingrid@main':{
                templateUrl: 'views/secondPage.html'
            },
            'secondgrid@main.second':{
                templateUrl: 'views/secondLevel.html'
            }
        }
    })
}]);