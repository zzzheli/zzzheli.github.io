//// 见封装
// app.directive('uploadFile', function($http) {
//     return {
//         restrict: "EA",
//         replace: true,
//         templateUrl: "../uploadFile.html",
//         link : function(scope, element, attr) {
//             scope.reader = new FileReader();
//             scope.progress = 0;
//             //初始进度条为0
//             scope.reader.onprogress = function (e) {
//                 //上传过程中进度条
//                 scope.progress = Math.floor(e.lengthComputable ? e.loaded / e.total * 100 : 0); //进度条
//             };
//
//             //选择文件:
//             scope.readFile = function (e) {
//                 scope.$apply(function () {
//                     scope.showMsg = true;
//                     //展示信息
//                     scope.class = 'glyphicon glyphicon-remove';
//                     //状态图标
//                     scope.file = e.files[0];
//                     //选择的第一个文件保存到变量file
//                     scope.input = e;
//                     //新建input变量，保存获取的参数
//                     scope.fileName = scope.file.name;
//                     //文件名字
//                     scope.fileSize = scope.file.size;
//                     //文件大小，之后通过filter转为MB
//                 })
//             };
//
//             //上传图片:
//             scope.fileUpload = function() {
//                 var formData = new FormData();
//                 scope.reader.readAsDataURL(scope.file);
//                 //文件信息
//                 formData.append('file', scope.file);
//                 //预览图片
//                 $http({
//                     method: 'POST',
//                     url: '/carrots-admin-ajax/a/u/img/task',
//                     data: formData,
//                     headers: {'Content-Type': undefined}
//                     //不限制格式
//                 }).then(function (res) {
//                     if (res.data.code === 0) {
//                         scope.showImg = true;
//                         //图片展示
//                         scope.srcImg = res.data.data.url;
//                         //图片地址
//                         scope.class = 'glyphicon glyphicon-ok';
//                         //状态图标
//                     }else {
//                         alert('系统异常');
//                     }
//                 },function(){
//                     alert('上传失败');
//                     scope.class = 'glyphicon glyphicon-remove';
//                 })
//             };
//
//             //删除:
//             scope.fileDelete = function() {
//                 scope.reader.abort();
//                 //中断上传
//                 scope.showMsg = false;
//                 //关闭信息展示
//                 scope.progress = 0;
//                 //进度条为0
//                 scope.srcImg = undefined;
//                 angular.element('#showImg').attr('src', '');
//                 //图片地址为空
//                 // scope.showImg = false;
//                 // 关闭图片展示
//                 scope.input.value = '';
//                 //文件value值为空
//             };
//         }
//     };
// });

app.controller('newArticle', function($scope, $stateParams, $http, $state) {

    //编辑页面 带ID:
    if($stateParams.id) {
        $scope.pageTitle = '编辑Article';
        $scope.showImg = true;
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id
        }).then(function(res) {
            $scope.newTitle = res.data.data.article.title;
            $scope.newType = res.data.data.article.type;
            $scope.srcImg = res.data.data.article.img;
            $scope.content = res.data.data.article.content;
            $scope.newLink = res.data.data.article.url;
            $scope.creatAt = res.data.data.article.createAt;
            $scope.newIndustry = res.data.data.article.industry;
        });

    }else {
        $scope.pageTitle = '新增Article';
    }
    $scope.newIndustry = ($scope.newType == 3)?$scope.newIndustry : undefined;

    //立即上线  status:2
    $scope.online = function () {
        if ($stateParams.id) {
            //编辑页面 带ID
            $http({
                method: 'PUT',
                url: '/carrots-admin-ajax/a/u/article/'+ $stateParams.id,
                params: {
                    title: $scope.newTitle,
                    type: $scope.newType,
                    img: $scope.srcImg,
                    status: 2,
                    content: $scope.content,
                    url: $scope.newLink,
                    createAt: $scope.creatAt,
                    industry: ($scope.newType == 3)?$scope.newIndustry : undefined
                }
            }).then(function (res) {
                if (res.data.code === 0) {
                    alert("上线成功");
                    $state.go("homepage.article", {reload: true})
                }else {
                    alert("上线异常");
                }
            }, function () {
                alert('上线失败')
            })
        } else {
            //新增页面:
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params: {
                    title: $scope.newTitle,
                    type: $scope.newType,
                    img: $scope.srcImg,
                    status: 2,
                    content: $scope.content,
                    url: $scope.newLink,
                    industry: ($scope.newType == 3)?$scope.newIndustry : undefined
                }
            }).then(function (res) {
                if (res.data.code === 0) {
                    alert("上线成功");
                    $state.go("homepage.article", {reload: true})
                }else {
                    alert("上线异常");
                }
            }, function () {
                alert('上线失败')
            })
        }
    };

    //存为草稿 status:1
    $scope.draft = function () {
        if($stateParams.id) {
            //编辑页面 带ID
            $http({
                method: 'PUT',
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                params: {
                    title: $scope.newTitle,
                    type: $scope.newType,
                    img: $scope.srcImg,
                    status: 1,
                    content: $scope.content,
                    url: $scope.newLink,
                    createAt: $scope.creatAt,
                    industry: ($scope.newType == 3)?$scope.newIndustry : undefined
                }
            }).then(function (res) {
                if (res.data.code === 0) {
                    alert("存稿成功");
                    $state.go("homepage.article", {reload: true})
                }else {
                    alert("存稿异常");
                }
            }, function () {
                alert('存稿失败')
            })
        }else {
            //新增页面:
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params: {
                    title: $scope.newTitle,
                    type: $scope.newType,
                    img: $scope.srcImg,
                    status: 1,
                    content: $scope.content,
                    url: $scope.newLink,
                    industry: ($scope.newType == 3)?$scope.newIndustry : undefined
                }
            }).then(function (res) {
                if (res.data.code === 0) {
                    alert("存稿成功");
                    $state.go("homepage.article", {reload: true})
                }else {
                    alert("存稿异常");
                }
            }, function () {
                alert('存稿失败')
            })
        }
    };


    //类型： ng-repeat
    $scope.reType = [
        {value: '' , name: '请选择'},
        {value: '0', name: '首页Banner'},
        {value: '1', name: '找职位Banner'},
        {value: '2', name: '找精英Banner'},
        {value: '3', name: '行业大图'}
    ];

    //行业大图：industry
    $scope.industry = [
        {value: '' , name: '请选择'},
        {value: '0', name: '移动互联网'},
        {value: '1', name: '电子商务'},
        {value: '2', name: '企业服务'},
        {value: '3', name: 'O2O'},
        {value: '4', name: '教育'},
        {value: '5', name: '金融'},
        {value: '6', name: '游戏'}
    ]
});



