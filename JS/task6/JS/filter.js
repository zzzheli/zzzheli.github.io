//类型  状态  操作  流量单位（uploadFile!）
app
    .filter("type",function () {
        return function (type) {
            switch(type){
                case 0:return"首页banner";
                case 1:return"找职位banner";
                case 2:return"找精英banner";
                case 3:return"行业大图";
            }
    }
    })
    .filter("status",function () {
        return function (type) {
            switch(type){
                case 1:return"草稿";
                case 2:return"上线";
            }
        }
    })
    .filter("line",function () {
        return function (type) {
            switch(type){
                case 1:return"上线";
                case 2:return"下线";
            }
        }
    })
    .filter("bytes",function () {
        return function (size) {

            if (!isNaN(size)){
                return (size/1024/1024).toFixed(2) + 'MB';
            }
        }
    });






