// app.controller('homeCtrl', function($scope, $state, $http){
app.directive('sidebar',function () {

    var arr = [];


    return{
        restrict:'EA',
        replace:true,
        templateUrl: "../sidebar.html",
        link : function(scope, element, attr) {


        //侧边栏列表
        scope.homeTitle = [
            {
                lv: 0, name: '信息管理', select: false,
                title: [
                    {name:'公司信息', url: '', highlight: false},
                    {name:'职位信息', url: '', highlight: false}
                ]
            },
            {
                lv: 1, name: '内容管理', select: false,
                title: [
                    {name:'Article列表', url: 'homepage.article', highlight: false },
                    {name:'信息管理', url: '', highlight: false}
                ]
            },
            {
                lv: 2, name: '后台管理', select: false,
                title: [
                    {name:'账号管理', url: '', highlight: false}
                ]
            },
            {
                lv: 3, name: '内容管理', select: false,
                title: [
                    {name:'视频管理', url: '', highlight: false}
                ]
            }
        ];



        //一级列表点击事件
        scope.list = function() {
            //数组内 select的默认状态为 false
            if(this.x.select === false) {
                //遍历数组，把所有select变成false
                angular.forEach(scope.homeTitle, function(item) {
                    item.select = false;
                });
                //改变当前的状态
                this.x.select = !this.x.select;
            }else {
                //如果点击的已经展开的一级列表，直接改变他的状态
                this.x.select = !this.x.select;
            }
        };

        //二级列表点击事件
        scope.sonList = function () {
            angular.forEach(scope.homeTitle, function(item) {
                item.title.some(function (b) {
                    b.highlight = false;
                })
            });
            this.y.highlight = true;
            arr = scope.homeTitle;
            sessionStorage.setItem('arr', JSON.stringify(arr));
        };

        //如果storage保存了数组就用它代替
        scope.homeTitle = (JSON.parse(sessionStorage.getItem('arr')) != null)? JSON.parse(sessionStorage.getItem('arr')) : scope.homeTitle;

        }
    };

});



