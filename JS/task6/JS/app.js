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
        });


    // //模态框封装
    // app.run(["$rootScope",function ($rootScope) {
    //     $rootScope.modalConfirm=function (title,content,fn) {
    //         bootbox.confirm({
    //             title: titles,
    //             message: content,
    //             buttons: {
    //                 cancel: {
    //                     label: '取消',
    //                     className: 'btn-success'
    //                 },
    //                 confirm: {
    //                     label: '确认',
    //                     className: 'btn-danger'
    //                 }
    //             },
    //             callback:fn
    //         })
    //     };
    //     $rootScope.modalAlert = function (titles, content, fn) {
    //         bootbox.alert({
    //             title: titles,
    //             message: content,
    //             callback: fn
    //         })
    //     }
    //
    //
    // }])



});



