angular.module('routerApp')
    .run(["$rootScope", "$state", "$stateParams","settings", function ($rootScope, $state, $stateParams,settings) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]).config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpInterceptors');

    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
        url: "/index",
        templateUrl: 'views/login.html'
    }).state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
    })
}]);