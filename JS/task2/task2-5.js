$(document).ready(function () {

    var  identity = JSON.parse(sessionStorage.getItem("identity"));
    //接收身份数据
    console.log(identity);

    var deadeNum = JSON.parse(sessionStorage.getItem("deadeNum"));
    var killDeade = JSON.parse(sessionStorage.getItem("killDeade"));
    var voteDeade = JSON.parse(sessionStorage.getItem("voteDeade"));
    //获取被杀下标，被投下标
    var dateNum =JSON.parse( sessionStorage.getItem("dateNum"));
    var arrKillDead = JSON.parse(sessionStorage.getItem("arrKillDead"));
    var arrVoteDead = JSON.parse(sessionStorage.getItem("arrVoteDead"));
    //天数，被杀数组，被投数组
    var newState;
    newState =sessionStorage.getItem("newState");
    if (newState == null ){
        newState = "start";
    }

    // var newState;
    // if (newState == null ){
    //     newState = "start";
    // }
    // else {
    //     var newState = sessionStorage.getItem("newState");
    // }//看似正确的错误逻辑

    console.log(newState);



    $(".h-img1").click(function () {
        sessionStorage.clear();

        location.href = "./task2-4.html";
    });
    //返回

    $(".btn1").click(function () {
        var T = confirm("结束游戏？");
        if (T === true) {
            sessionStorage.clear();
            location.href = './task2-1.html';
        }
    });

    $(".btn2").click(function () {
        location.href ="./task2-DATE.html"
    });
    //法官日志



    function aboutKill () {
        if (deadeNum[dateNum-1] === "X") {
            $(".kill").after("<div class='killTxt'>" +
                '晚上：平安无事' +
                "</div>");
        }
        else  {
            $(".kill").after("<div class='killTxt'>" + (killDeade+1) +
            '号被杀手杀了，真实身份是平民' +
            "</div>");
        }
    }

    function abuotVote () {
        $(".vote").after("<div class='killTxt'>" + (voteDeade+1) +
            '号被投死了，真实身份是' +
            "</div>");

    }


    var fsm = new StateMachine({
        init:newState,
        transitions: [
            {name:"kill",from:"start",to:"killed"},
            {name:"tell",from:"killed",to:"told"},
            {name:"speak",from:"told",to:"spoke"},
            {name:"vote",from:"spoke",to:"voted"}
        ],

        methods: {
            onKill:function () {
                $(".kill").css({backgroundColor:"#2375af"});
                $(".triLeft1").css({borderColor:"transparent #2375af transparent transparent"});
                // $(".kill").addClass("over1");
                // $(".triLeft1").addClass("over2");//思路二
            },
            onTell:function () {
                $(".tell").css({backgroundColor:"#2375af"});
                $(".triLeft2").css({borderColor:"transparent #2375af transparent transparent"});
                // $(".tell").addClass("over1");
                // $(".triLeft2").addClass("over2");//思路二
            },
            onSpeak:function () {
                $(".speak").css({backgroundColor:"#2375af"});
                $(".triLeft3").css({borderColor:"transparent #2375af transparent transparent"});
            },
            onVote:function () {
                $(".vote").css({backgroundColor:"#2375af"});
                $(".triLeft4").css({borderColor:"transparent #2375af transparent transparent"});
            }
        }

    });

    switch (fsm.state){
        case "killed" :
            fsm.onKill();
            aboutKill();
            break;
        case "told":
            fsm.onKill();
            fsm.onSpeak();
            break;
        case "spoke":
            fsm.onKill();
            fsm.onTell();
            fsm.onSpeak();
            break;
        case "voted":
            fsm.onKill();
            fsm.onTell();
            fsm.onSpeak();
            fsm.onVote();
            abuotVote ();
            aboutKill();
    }
    // 判断，改变颜色
    $(".dateNow").text("第"+dateNum+"天");

    for (var i=1; i<dateNum ; i++){
        var html =
            "<div class=\"addBox\">\n" +
            "<div class=\"date\" >第<span class=\"dayNum\">"+i+"</span>天</div>\n" +
            "<div class=\"main-box\">\n" +
            "    <div class=\"triangle\"></div>\n" +
            "    <div class=\"box\">\n" +
            "        <div class=\"border\"></div>\n" +
            "        <div class=\"logo1\"></div>\n" +
            "            <div class=\"kill mark1\" >\n" +
            "                <div class=\"triLeft1 mark2\"></div><span>杀手杀人</span></div>\n" +
            "            <div class=\"killOld \">"+(Number(arrKillDead[i-1]+1))+"号被杀手杀了，真实身份是平民</div>\n" +
            "            <div class=\"tell mark1\" >\n" +
            "                <div class=\"logo2\"></div>\n" +
            "                <div class=\"triLeft2 mark2\"></div><span>亡灵发表遗言</span></div>\n" +
            "            <div class=\"speak mark1\" >\n" +
            "                <div class=\"triLeft3 mark2\"></div><span>玩家依次发言</span></div>\n" +
            "            <div class=\"vote mark1\" >\n" +
            "                <div class=\"triLeft4 mark2\"></div><span>全民投票</span></div>\n" +
            "    </div>\n" +
            "    </div>\n" +
            "</div>";

        $(".addBox").eq(i-1).before(html);
        $(".addBox").eq(i-1).find(".main-box").hide();
        //隐藏前天盒子
        $(".box").eq(i-1).find(".mark1").css({background:"#2375af"});
        $(".box").eq(i-1).find(".mark2").css({borderColor:"transparent #2375af transparent transparent"});

        // function aboutKillED () {
        //     if (deadeNum[dateNum-2] == "X") {
        //         $(".kill").eq(i-1).after("<div class='killTxt'>" +
        //             '没有进行任何操作' +
        //             "</div>");
        //     }
        //     else  {
        //         $(".kill").eq(i-1).after("<div class='killTxt'>" + (Number(arrKillDead[i-1])+1) +
        //             '号被杀手杀了，真实身份是平民' +
        //             "</div>");
        //     }
        // }
        // aboutKillED();
        // abuotVotED();
        //思路一（无操作还是有点问题）

        if (arrKillDead[i-1] === "n"){
            $('.killOld').eq(i-1).text("晚上：平安无事");
        }
        $(".vote").eq(i-1).after("<div class='killTxt'>" + (Number(arrVoteDead[i-1])+1) +
            '号被投死了，真实身份是' + (identity[voteDeade]) +
            "</div>");

        $('.all').scrollTop(9999);
    }

    $(".date").click(function () {
        $(this).next().slideToggle();
    });

    $("#now").click(function () {
        $(this).next().slideToggle();
    });
   //点击隐藏显示盒子
    $(".kill").click(function () {

        if ((fsm.state == "start") && (this.style.backgroundColor === "")  ){
            fsm.kill();
            console.log(fsm.state);location.href= "./task2-6.html";
        }
        else {
            alert("请按顺序操作")
        }
    });

    $(".tell").click(function () {

        if ((fsm.state == "killed") && (this.style.backgroundColor === "")){
            var trueOrFalse = confirm ("请死者亮明身份并发表遗言");

            if (trueOrFalse == true){
                fsm.tell();
                newState = fsm.state;
                sessionStorage.setItem("newState",newState);
                //即时存状态
            }
        }
        else {
            alert("请按顺序操作")
        }
    });

    $(".speak").click(function () {

        if ((fsm.state == "told") && (this.style.backgroundColor === "")){
            var trueOrFalse = confirm ("请玩家依次发言讨论");

            if (trueOrFalse == true){
                fsm.speak();
                newState = fsm.state;
                sessionStorage.setItem("newState",newState);
                //即时存状态
            }
        }
        else {
            alert("请按顺序操作")
        }
    });

    $(".vote").click(function () {

        if ((fsm.state == "spoke") && (this.style.backgroundColor === "")){
                fsm.vote();
                newState = fsm.state;
                sessionStorage.setItem("newState",newState);
                //即时存状态
                dateNum = JSON.stringify(dateNum);
                sessionStorage.setItem("dateNum",dateNum);
                location.href="./task2-7.html"
        }
        else {
            alert("请按顺序操作")
        }
    });


});