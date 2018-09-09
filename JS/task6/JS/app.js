var app = angular.module("myApp",['ui.router','ui.bootstrap','ngMessages','ng.ueditor']);

app.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','login');

    $stateProvider
        .state("homepage",{
            url:"/homepage",
            templateUrl:"homepage.html"
        })

        .state("login",{
            url:"/login",
            templateUrl:"login.html"
        })

        .state("homepage.article",{
            url:"/article?page&size&total&startAt&endAt&status&type",
            templateUrl:"article.html"
        })
        .state("homepage.newArticle",{
            url:"/articleDetail?id",
            templateUrl:"newArticle.html"
        })


});



