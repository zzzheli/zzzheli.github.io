$(document) .ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);
    var playerState= JSON.parse(sessionStorage.getItem("playerState"));

    for ( i=0 ; i<identity.length; i++){
        $(".contentBox").append(
            "<div class=\"identityBox\">\n" +
            "        <div class=\"idBox\">\n" + (identity[i]) +
            "\n" +
            "        </div>\n" +
            "        <div class=\"numBox\">\n" + (i+1)+ "号"+
            "        </div>\n" +
            "    </div>");
        if (playerState[i].state === "die"){
            $(".idBox").eq(i).css({"backgroundColor":"#2375af"});
        }
    }

    $(".btn1").click(function () {
        history.back(-1);
    })

});