var playersNum = document.getElementById("playersNum");
var rangeNumber = document.getElementById("rangeNumber");
var killers = document.getElementById("killers");
var civilians = document.getElementById("civilians");
var btnL = document.getElementById("top3-img1");
var btnR = document.getElementById("top3-img2");
var deal = document.getElementById("deal");
var killersNum;
var civiliansNum;
var back = document.getElementById("h-img1");

back.onclick = function () {
    sessionStorage.clear();
    location.href = "./task2-1.html";
};
//返回

function kiOrCi () {
    if(playersNum.value < 15){
        killers.value = Math.floor(playersNum.value / 3);
    }
    else {
        killers.value = Math.floor((playersNum.value-1) / 3);
    }
     killers.innerText = killers.value;
    //分配杀手数量
     civilians.value = playersNum.value - killers.value;
     civilians.innerText = civilians.value;
     console.log(killers.value,civilians.value);
     //分配平民数量
}

function pNumber(){
    if(playersNum.value>=4&&playersNum.value<=18){
        rangeNumber.value=playersNum.value;
        //设置数值范围
    }
    else{
        alert("请输入正确的玩家数量");
        playersNum.value=4;
        //数值不正确时重置
    }
}

function slid(){
    playersNum.value=rangeNumber.value;
    kiOrCi();
    //设置滑动条的值等于玩家人数
}

function btnLeft(){
    rangeNumber.value--;
    playersNum.value = rangeNumber.value;
}
function btnRight(){
    rangeNumber.value++;
    playersNum.value = rangeNumber.value;
    //+-按钮
}

// playersNum.addEventListener("input",kiOrCi);
// rangeNumber.addEventListener("input",kiOrCi);
//监听联动

rangeNumber.oninput = function () {
    slid();
    kiOrCi();
};
btnL.onclick = function () {
    btnLeft();
    kiOrCi();
};
btnR.onclick = function () {
    btnRight();
    kiOrCi();
};
playersNum.onchange = function () {
    pNumber();
    kiOrCi();
};
killers.onchange = function () {
    kiOrCi();
};
//点击，滑动 数值联动

var identity = new Array();

function addIdentityArray(){
    // var identity = [];
    for (var k = 0; k < killers.value; k++) {
        identity.push("杀手");
    }
    for (var c = 0; c < civilians.value; c++) {
        identity.push("平民");
    }
    return identity;
}
//给数组添加身份


function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
//洗牌算法


function textarray() {
    identity= shuffle(identity);
    identity = JSON.stringify(identity);
    sessionStorage.setItem("identity",identity);
    killersNum = killers.innerText;
    sessionStorage.setItem("killersNum",killersNum);
    civiliansNum = civilians.innerText;
    sessionStorage.setItem("civiliansNum",civiliansNum);
}
// 洗牌，转化为json格式，存入sessionStorage


deal.onclick = function () {
    window.location.href = "./task2-3.html";
    identity = [];
    kiOrCi ();
    addIdentityArray();
    shuffle(identity);
    textarray();
    console.log(identity);
    console.log(killersNum);
    console.log(civiliansNum);
};
//点击 清空数组，给人数，给身份，洗牌，转JSON，存


