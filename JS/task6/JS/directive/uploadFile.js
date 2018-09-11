app.directive('uploadFile', function($http) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "../uploadFile.html",
        link : function(scope, element, attr) {
            scope.reader = new FileReader();
            scope.progress = 0;
            //初始进度条为0
            scope.reader.onprogress = function (e) {
                //上传过程中进度条
                scope.progress = Math.floor(e.lengthComputable ? e.loaded / e.total * 100 : 0); //进度条
            };

            //选择文件:
            scope.readFile = function (e) {
                scope.$apply(function () {
                    scope.showMsg = true;
                    //展示信息
                    scope.class = 'glyphicon glyphicon-remove';
                    //状态图标
                    scope.file = e.files[0];
                    //选择的第一个文件保存到变量file
                    scope.input = e;
                    //新建input变量，保存获取的参数
                    scope.fileName = scope.file.name;
                    //文件名字
                    scope.fileSize = scope.file.size;
                    //文件大小，之后通过filter转为MB
                })
            };

            //上传图片:
            scope.fileUpload = function() {
                var formData = new FormData();
                scope.reader.readAsDataURL(scope.file);
                //文件信息
                formData.append('file', scope.file);
                //预览图片
                $http({
                    method: 'POST',
                    url: '/carrots-admin-ajax/a/u/img/task',
                    data: formData,
                    headers: {'Content-Type': undefined}
                    //不限制格式
                }).then(function (res) {
                    if (res.data.code === 0) {
                        scope.showImg = true;
                        //图片展示
                        scope.srcImg = res.data.data.url;
                        //图片地址
                        scope.class = 'glyphicon glyphicon-ok';
                        //状态图标
                    }else {
                        alert('系统异常');
                    }
                },function(){
                    alert('上传失败');
                    scope.class = 'glyphicon glyphicon-remove';
                })
            };

            //删除:
            scope.fileDelete = function() {
                scope.reader.abort();
                //中断上传
                scope.showMsg = false;
                //关闭信息展示
                scope.progress = 0;
                //进度条为0
                scope.srcImg = undefined;
                angular.element('#showImg').attr('src', '');
                //图片地址为空
                // scope.showImg = false;
                // 关闭图片展示
                scope.input.value = '';
                //文件value值为空
            };
        }
    };
});
