// //原生JS
// var xhr = new XMLHttpRequest();
// //创建xhr对象
// var userIn = document.getElementById("userIn");
// var pswIn = document.getElementById("pswIn");
// var warn = document.getElementById("warn");
// var logButton = document.getElementById("logButton");
// warn.innerHTML="";
//
// logButton.onclick = function () {
//     var userName=userIn.value;
//     var passWord=pswIn.value;
//     if (userName==="" || passWord===""){
//         warn.innerHTML="请输入用户名与密码";
//     } else {
//       xhr.onreadystatechange=function () {
//           //注册状态事件回调处理函数
//           if (xhr.readyState === 4){
//               //请求状态：请求已完成
//               console.log(xhr);
//               if (xhr.status === 200){
//                   //状态码：成功
//                   var response = JSON.parse(xhr.responseText);
//                   console.log(response);
//                   if (response.message === "success"){
//                       location.href = "http://dev.admin.carrots.ptteng.com"
//                   } else {
//                       warn.innerHTML=response.message;
//                   }
//               }
//           }
//       };
//       xhr.open("POST","/carrots-admin-ajax/a/login",true);
//       // open发请求：POST请求，请求地址，异步
//       xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//       //设置头信息为发送表单数据；一定要位于open和send之间
//       xhr.send("name=" + userName + "&pwd=" + passWord);
//       //发送数据
//     }
//     console.log(userName,passWord);
// };


// JQ:
//
$(document).ready(function () {
    $("#logButton").click(function () {
        var userName=$("#userIn").val();
        var passWord=$("#pswIn").val();
        if (userName==="" || passWord===""){
            $("#warn").html("请输入用户名与密码");
        }else {
            $.ajax({
                type:"POST",
                url:"/carrots-admin-ajax/a/login",
                dataType:"json",
                data:{
                    name:userName,
                    pwd:passWord
                },

                success: function(data){
                    if(data.message === "success"){
                        location.href = 'http://dev.admin.carrots.ptteng.com';
                    }else {
                        $('#warn').html(data.message);
                    }
                }
                // success: function(response){
                //     if(response.success){
                //         location.href = 'http://dev.admin.carrots.ptteng.com';
                //     }else {
                //         $('#warn').html(response.message);
                //     }
                // }
                // 思路二 .success是有问题的

            });
        }
    })
});