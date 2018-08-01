
var box = document.getElementsByClassName("box");
var start = document.getElementById("btn1");
var stop = document.getElementById("btn2");
var time;

function color() {
    var rgb;
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
}


function getbox() {
        var one = Math.floor(Math.random()*box.length);
        var two = Math.floor(Math.random()*box.length);
        var three = Math.floor(Math.random()*box.length);
        if((one === two) || (one === three) || (two === three)){
            getbox()
        }
        else {
        box[one].style.backgroundColor = color();
        box[two].style.backgroundColor = color();
        box[three].style.backgroundColor = color();
        }
}



start.onclick = function () {
    this.style.backgroundColor = "#ffa500";
    this.style.color = "#fff";
    stop.style.backgroundColor = "#fff";
    stop.style.color = "#ffa500";

    clearInterval(time);
    time = setInterval(function(){
         for(var i = 0; i < 9; i++){
            box[i].style.backgroundColor = "";
         }

          getbox();

         },1000);
};

stop.onclick = function () {
    this.style.backgroundColor = "#ffa500";
    this.style.color = "#fff";
    start.style.backgroundColor = "#fff";
    start.style.color = "#ffa500";

    clearInterval(time);
    for(var i=0; i<9; i++){
            box[i].style.backgroundColor = "";
    }
};


