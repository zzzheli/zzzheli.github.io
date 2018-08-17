$(document) .ready(function () {
    var killersNum = JSON.parse(sessionStorage.getItem("killersNum"));
    var civiliansNum = sessionStorage.getItem("civiliansNum");
    var identity = JSON.parse(sessionStorage.getItem("identity"));
    var voteDeade = JSON.parse(sessionStorage.getItem("voteDeade"));
    var killDeade = JSON.parse(sessionStorage.getItem("killDeade"));
    var dateNum =JSON.parse( sessionStorage.getItem("dateNum"));
    var arrKillDead = JSON.parse(sessionStorage.getItem("arrKillDead"));
    var arrVoteDead = JSON.parse(sessionStorage.getItem("arrVoteDead"));
    console.log(identity,arrKillDead,arrVoteDead ,voteDeade,killDeade,dateNum);

    $(".btn1").click(function () {
    sessionStorage.clear();
    location.href = "./task2-1.html";
    });
    //再来一局
    $("#remain1").text(killersNum);
    $("#remain2").text(civiliansNum);

    for ( i=1; i<dateNum+1; i++){
        var html =
            "<div class=\"txtBox\">\n" +
            "    <div class=\"remaining\">第"+i+"天</div>\n" +
            "    <div class=\"remaining font2 night\" >\n" +
            "        晚上："+(Number(arrKillDead[i-1]+1))+"号被杀手杀了，真实身份是平民\n" +
            "    </div>\n" +
            "    <div class=\"remaining  font2 day\" >\n" +
            "        白天："+(Number(arrVoteDead[i-1]+1))+"号被投死了，真实身份是\n"+identity[arrVoteDead[i-1]]+
            "    </div>\n" +
            "\n" +
            "</div>";
        $(".Text").append(html);
        if (arrKillDead[i-1] === "n"){
            $('.night').eq(i-1).text("晚上：平安无事");
        }
        if (arrVoteDead[dateNum-1] == undefined){
            $('.day').eq(dateNum-1).text("白天? 再也没有白天了！无限ツクヨミ！");
        }
        // 杀完人结束
        if (arrKillDead[i-1] == undefined){
            $('.day').eq(i-1).text("平民胜利了！愿圣光永远照耀着您！");
            $('.night').eq(i-1).text("");
        }
    }
});
