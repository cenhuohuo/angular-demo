
angular.module("routerApp").factory("maintenance",["$resource","settings",function ($resource,settings) {
    return $resource(null,null,{
        /*文章--栏目管理*/
        getModuleList: {
            method: 'GET',
            url: settings.mall + settings.mallModule+'?time=' + new Date().getTime()
        },
        addModule: {
            method: 'POST',
            url: settings.mall + settings.mallModule
        },
        updateModule: {
            method: 'PUT',
            url: settings.mall + settings.mallModule+'/:moduleId'
        },
        deleteModule: {
            method: 'DELETE',
            url: settings.mall + settings.mallModule+'/:moduleId'
        },
        /*文章*/
        getArticleList: {
            method: 'GET',
            url: settings.mall + settings.mallArticle+'/:moduleType/page/:pageIndex'
        },
        addArticle: {
            method: 'POST',
            url: settings.mall + settings.mallArticle+'/:moduleType'
        },
        deleteArticle: {
            method: 'DELETE',
            url: settings.mall + settings.mallArticle+'/:articleId'
        },
        getArticleById: {
            method: 'GET',
            url: settings.mall + settings.mallArticle+'/:articleId'
        },
        updateArticle:{
            method: 'PUT',
            url: settings.mall + settings.mallArticle+'/:articleId'
        }
    })
}])