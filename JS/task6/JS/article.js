//ArticleList页面控制器
app.controller('articleCtrl', function($scope, $http, $state, $stateParams,$filter, $window) {

    $scope.data = $stateParams;
    $scope.startDate = ($stateParams.startAt === undefined) ? undefined : Number($stateParams.startAt);
    $scope.endDate = ($stateParams.endAt === undefined) ? undefined : Number($stateParams.endAt);
    $scope.type = $scope.data.type;
    $scope.status = $scope.data.status;
    $scope.size = ($scope.data.size === undefined)? 10 : $scope.data.size;

    //获取日期
    $scope.format = 'yyyy-MM-dd';
    $scope.altInputFormats = ['yyyy-M!-d!'];
    $scope.today = new Date();
    //开始日期
    $scope.popupStart = {
        opened: false
    };
    $scope.openStart = function () {
        $scope.popupStart.opened = true;
        if ($scope.endDate === undefined) {
            $scope.maxDay = $scope.today;
        } else {
            $scope.maxDay = $scope.endDate;
        }
    };
    //结束日期
    $scope.popupEnd = {
        opened: false
    };
    $scope.openEnd = function () {
        $scope.popupEnd.opened = true;
        $scope.endDate = undefined;
    };

    //GET请求表格数据渲染
    $scope.getSearch = function () {
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/search',
            params: {
                size: $stateParams.size,
                page: $stateParams.page,
                startAt: $stateParams.startAt,
                endAt: $stateParams.endAt,
                type: $stateParams.type,
                status: $stateParams.status
            }
        }).then(function successCallback(response) {

            $scope.records = response.data.data.articleList;     //搜索后的列表数据
            $scope.page = $stateParams.page;                     //搜索后的页数
            $scope.totalItems = response.data.data.total;        //搜索后的数据总条数
            console.log(response);
        });
    };

    $scope.getSearch();

    //搜索或确定，传参后的页面
    $scope.search = function(){
        var startD;
        var endD;
        var page;
        if($scope.startDate === undefined) {
            startD = undefined;
        }else {
            startD = isNaN($scope.startDate.toString()) ? $scope.startDate.getTime() : $scope.startDate;
        }
        if($scope.endDate === undefined) {
            endD = undefined;
        }else {
            endD = isNaN($scope.endDate.toString()) ? $scope.endDate.getTime() + 86399999 : $scope.endDate;
        }
        if($scope.newPage === undefined) {
            page = $scope.page;
        }else {
            page = $scope.newPage;
        }
        $state.go('homepage.article', {
            size: $scope.size,
            page: page,
            startAt: startD,
            endAt: endD,
            type: $scope.type,
            status: $scope.status
        },{reload:true});
        // console.log($stateParams)
    };

    //清除
    $scope.clean = function() {
        $scope.size = undefined;
        $scope.page = undefined;
        $scope.startDate = undefined;
        $scope.endDate = undefined;
        $scope.type = undefined;
        $scope.status = undefined;
        $scope.search();
    };


    //类型： ng-repeat
    $scope.reType = [
        {value: '' , name: '全部'},
        {value: '0', name: '首页Banner'},
        {value: '1', name: '找职位Banner'},
        {value: '2', name: '找精英Banner'},
        {value: '3', name: '行业大图'}
    ];

    //状态： ng-repeat
    $scope.reStatus = [
        {value: '' , name: '全部'},
        {value: '1', name: '草稿'},
        {value: '2', name: '上线'}
    ];


    //上下线模态框提示
    $scope.lineModal = function() {
        $scope.idLine = this.x.id;
        $scope.statusLine = this.x.status;
        if (this.x.status === 1) {
            $scope.tips1 =
                "<p style=\"font-size: 16px;color: #999;text-align: center\">" +
                "上线后该图片将在轮播banner中展示。</p>\n" +
                "<h4 style=\"font-size: 20px;text-align: center\">" +
                "是否执行上线操作？</h4>";
            $scope.tips2 = '上线成功';
        } else {
            $scope.tips1 =
                "<p style=\"font-size: 16px;color: #999;text-align: center\">" +
                "下线后该图片将不展示站轮播banner中。</p>\n" +
                "<h4 style=\"font-size: 20px;text-align: center\">" +
                "是否执行下线操作？</h4>";
            $scope.tips2 = '下线成功';
        }

        // //见封装
        bootbox.confirm({
            title: '操作提示',
            message: $scope.tips1,
            buttons: {
                cancel: {
                    label: '取消'
                },
                confirm: {
                    label: '确认'
                }
            },
            callback: function(result) {
                if(result === true) {
                    $http ({
                        method: 'PUT',
                        url: '/carrots-admin-ajax/a/u/article/status',
                        params: {
                            id: $scope.idLine,
                            status: ($scope.statusLine === 1)? 2 : 1
                        }
                    }).then(function (res) {
                        if(res.data.code === 0){
                            $state.reload('homepage.article');
                            bootbox.alert({
                                title: '提示',
                                message: $scope.tips2
                            });
                        }else {
                            bootbox.alert({
                                title: '提示',
                                message: '系统异常'
                            });
                        }
                    }, function () {
                        bootbox.alert({
                            title: '提示',
                            message: '提交失败'
                        });
                    });
                }
            }
        });
    };

    //删除
    $scope.delete = function() {
        $scope.idDel = this.x.id;
        bootbox.confirm({
            title: '操作提示',
            message: '是否确认删除',
            buttons: {
                cancel: {
                    label: '取消'
                },
                confirm: {
                    label: '确认'
                }
            },
            callback: function(result) {
                if(result === true) {
                    $http({
                        method: 'DELETE',
                        url: '/carrots-admin-ajax/a/u/article/' + $scope.idDel
                    }).then(function(res) {
                        if(res.data.code === 0) {
                            $state.reload('homepage.article');
                            bootbox.alert({
                                title: '提示',
                                message: "删除成功"
                            });
                        }else {
                            bootbox.alert({
                                title: '提示',
                                message: '系统异常'
                            });
                        }
                    },function () {
                        bootbox.alert({
                            title: '提示',
                            message: '删除失败'
                        });
                    })
                }
            }
        });
    };

});





