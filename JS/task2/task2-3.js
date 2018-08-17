$(document) .ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);
    var n = 0;

    $(".h-img1").click(function () {
        sessionStorage.clear();
        location.href = "./task2-2.html";
    });
    //返回

    $(".circleNum").text(1);
    $(".visibleTxt").text("查看1号身份");
    // $(".hiddenTxt").hide();//思路
    $(".id-img2").hide();

    var pState = {};
    //创建玩家状态对象
    var playerState= [];
    for ( i=0 ; i<identity.length; i++){
        pState = {
            id:identity[i],
            state:"live"
        };
        playerState.push(pState);
    }
    //创建玩家状态数组
    var  dateNum =1;
    var deadeNum = [];
    var arrKillDead =[];
    var arrVoteDead =[];
    //天数死亡数，被杀数组，被投数组
    $(".btn1").click(function () {

        // if (n< (identity.length*2 - 1)){
        //     n++;
        //     $(".circleNum").text(n/2+1)
        //     $(".visibleTxt").text("查看"+ (n/2+1) +"号身份")
        //     $(".hiddenTxt").text("隐藏并传递给"+ (n/2+1.5) +"号")
        //     console.log(n);
        // }
        // else  {
        //     window.open("http://www.w3school.com.cn/");
        // }
        //
        // if ($(".id-img2").css("display")==="none"){
        //     $(".id-img1").hide();
        //     $(".id-img2").show();
        // }
        // else {
        //     $(".id-img1").show();
        //     $(".id-img2").hide();
        // }
        //思路一

        // if (n < (identity.length )){
        //
        //     if ($(".id-img2").css("display")==="none"){
        //         n++;
        //         $(".hiddenTxt").text("隐藏并传递给"+ (n+1) +"号").show();
        //         $(".visibleTxt").hide();
        //         $(".id-img1").hide();
        //         $(".id-img2").show();
        //         if (n === (identity.length - 1)){
        //             $(".visibleTxt").text("法官查看").show();
        //         }
        //     }
        //     else {
        //         $(".circleNum").text(n+1);
        //         $(".visibleTxt").text("查看"+ (n+1) +"号身份").show();
        //         $(".hiddenTxt").hide();
        //         $(".id-img1").show();
        //         $(".id-img2").hide();
        //     }
        // }
        // else  {
        //     window.open("http://www.w3school.com.cn/");
        //
        // }
        //思路二

        if (n < (identity.length)){

            if ($(".id-img2").css("display")==="none"){
                n++;
                $(".visibleTxt").text("隐藏并传递给"+ (n+1) +"号").show();
                $(".idTxt").text(identity[n-1]);

                $(".id-img1").hide();
                $(".id-img2").show();
                if (n === (identity.length)){
                    $(".visibleTxt").text("法官查看").show();
                }
            }
            else {
                $(".circleNum").text(n+1);
                $(".visibleTxt").text("查看"+ (n+1) +"号身份").show();

                $(".id-img1").show();
                $(".id-img2").hide();
            }
        }
        else  {
            dateNum = JSON.stringify(dateNum);
            sessionStorage.setItem("dateNum",dateNum);
            playerState=JSON.stringify(playerState);
            sessionStorage.setItem("playerState",playerState);
            deadeNum = JSON.stringify(deadeNum );
            sessionStorage.setItem("deadeNum",deadeNum);
            arrKillDead =JSON.stringify(arrKillDead );
            sessionStorage.setItem("arrKillDead",arrKillDead);
            arrVoteDead =JSON.stringify(arrVoteDead );
            sessionStorage.setItem("arrVoteDead",arrVoteDead);
            window.location.href ="./task2-4.html";
        }
        });
});