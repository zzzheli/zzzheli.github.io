$(document) .ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);
    var playerState= JSON.parse(sessionStorage.getItem("playerState"));
    //读取玩家状态数组
    var killDeade;//被杀的下标
    var deadeNum = JSON.parse(sessionStorage.getItem("deadeNum"));
    //杀死数
    var killersNum = sessionStorage.getItem("killersNum");
    var civiliansNum = sessionStorage.getItem("civiliansNum");
    //杀手平民人数
    var arrKillDead = JSON.parse(sessionStorage.getItem("arrKillDead"));
   //被杀死数组

    $(".h-img1").click(function () {
        sessionStorage.clear();
        location.href = "./task2-3.html";
    });
    //返回

    console.log(arrKillDead);
    console.log(deadeNum);


    for ( i=0 ; i<identity.length; i++){

        $(".contentBox").append("<div class=\"cBox\">\n" +
            "    <div class=\"identityBox\">\n" +
            "        <div class=\"idBox\">"+identity[i]+"</div>\n" +
            "        <div class=\"numBox\">"+(i+1)+ "号"+"</div>\n" +
            "    </div>\n" +
            "    <div class=\"hideBox\"></div>\n" +
            "    </div>");


        $(".hideBox").hide();
        if (playerState[i].state === "die"){
            $(".idBox").eq(i).css({"backgroundColor":"#2375af"});
        }
    }
    //改色


    $(".cBox").click(function () {
        $(".hideBox").hide();
        $(this).children(".hideBox").show();
        killDeade = $(this).index();
    });
   //获取选择下标


    $(".btn1").click(function () {
        if (playerState[killDeade] === undefined){
            sessionStorage.setItem("civiliansNum",civiliansNum);
            deadeNum.push("X") ;
            deadeNum =JSON.stringify( deadeNum);
            sessionStorage.setItem("deadeNum",deadeNum);
            playerState=JSON.stringify(playerState);
            sessionStorage.setItem("playerState",playerState);
            var newState = 'killed';
            sessionStorage.setItem("newState",newState);
            arrKillDead.push("n") ;
            arrKillDead =JSON.stringify( arrKillDead);
            sessionStorage.setItem("arrKillDead",arrKillDead);
            history.back(-1);
        }
        else if (playerState[killDeade].state === "live"){
            if (identity[killDeade] === "杀手"){
                alert('您不能杀死本职业，请选择其他玩家');
            }
            else {
                $(".idBox").eq(killDeade).css({"backgroundColor":"#2375af"});
                playerState[killDeade] = {
                    id:identity[killDeade],
                    state:"die"
                };
                civiliansNum = civiliansNum -1;
                sessionStorage.setItem("civiliansNum",civiliansNum);
                deadeNum.push("Y");
                deadeNum =JSON.stringify( deadeNum);
                sessionStorage.setItem("deadeNum",deadeNum);
                sessionStorage.setItem("killDeade",killDeade);
                playerState=JSON.stringify(playerState);
                sessionStorage.setItem("playerState",playerState);
                var newState = "killed";
                sessionStorage.setItem("newState",newState);
                arrKillDead.push(killDeade) ;
                arrKillDead =JSON.stringify( arrKillDead);
                sessionStorage.setItem("arrKillDead",arrKillDead);
                if (killersNum == 0 || civiliansNum == 0){
                    location.href = "./task2-8.html";
                }
                else {
                    history.back(-1);
                }
            }
        }

        else {
            alert('请勿鞭尸');
        }
        console.log(playerState)
    })



});