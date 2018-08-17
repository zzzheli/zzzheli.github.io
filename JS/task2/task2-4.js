$(document) .ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);

    $(".h-img1").click(function () {
        sessionStorage.clear();
        location.href = "./task2-3.html";
    });
    //返回
        
    for ( i=0 ; i<identity.length; i++){
        $(".contentBox").append(
            "<div class=\"identityBox\">\n" +
            "        <div class=\"idBox\">\n" + (identity[i]) +
            "\n" +
            "        </div>\n" +
            "        <div class=\"numBox\">\n" + (i+1)+ "号"+
            "        </div>\n" +
            "    </div>");
    }


    $(".btn1").click(function () {
        location.href ="./task2-5.html"

    })


});