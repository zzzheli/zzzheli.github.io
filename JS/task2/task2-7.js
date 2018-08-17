$(document) .ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);
    var killersNum = sessionStorage.getItem("killersNum");
    var civiliansNum = sessionStorage.getItem("civiliansNum");

    var playerState = JSON.parse(sessionStorage.getItem("playerState"));
    //获取玩家状态数组
    var voteDeade;//被投的下标

    var newState = "start";
    sessionStorage.setItem("newState",newState);

    var dateNum = JSON.parse(sessionStorage.getItem("dateNum"));

    console.log(typeof playerState);

    var arrVoteDead = JSON.parse(sessionStorage.getItem("arrVoteDead"));


    $(".h-img1").click(function () {
        sessionStorage.clear();
        location.href = "./task2-3.html";
    });
    //返回




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





    $(".cBox").click(function () {
        $(".hideBox").hide();
        $(this).children(".hideBox").show();
        voteDeade = $(this).index();
    });






    $(".btn1").click(function () {




        if (playerState[voteDeade] == undefined){
            alert("请选择玩家");
        }

        else if (playerState[voteDeade].state === "live"){
            $(".idBox").eq(voteDeade).css({"backgroundColor":"#2375af"});
            playerState[voteDeade] = {
                id:identity[voteDeade],
                state:"die"
            };
            playerState=JSON.stringify(playerState);
            sessionStorage.setItem("playerState",playerState);
            sessionStorage.setItem("voteDeade",voteDeade);
            dateNum = dateNum +1;
            dateNum = JSON.stringify(dateNum);
            sessionStorage.setItem("dateNum",dateNum);
            arrVoteDead.push(voteDeade) ;
            arrVoteDead =JSON.stringify( arrVoteDead);
            sessionStorage.setItem("arrVoteDead",arrVoteDead);

            if (identity[voteDeade] === "杀手"){

                killersNum = killersNum -1;
                sessionStorage.setItem("killersNum",killersNum);
                console.log(killersNum);

                if (killersNum == 0 || civiliansNum == 0){
                    location.href = "./task2-8.html";
                }
                else {
                    history.back(-1);
                    console.log(arrVoteDead);
                }

                console.log(playerState);
            }

            else if (identity[voteDeade] === "平民"){
                civiliansNum = civiliansNum -1;
                sessionStorage.setItem("civiliansNum",civiliansNum);
                if (killersNum == 0 || civiliansNum == 0){
                    location.href = "./task2-8.html";
                }
                else {
                    history.back(-1);
                    console.log(arrVoteDead);
                }
            }
        }
        else {
            alert('请勿鞭尸');
        }




    })







});