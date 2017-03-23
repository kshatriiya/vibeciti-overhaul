var divArray = [];
var divs = document.querySelectorAll(".track-box");
var canvas, ctx, source, context, bars, bar_x, bar_width, bar_height;
var frameArray = [0, 0, 0, 0, 0, 0];
var animationSequence;

var imgArray = ["touhou.jpg", "breaker.jpg", "bleach.jpg", "kaneki.jpg", "fruit.jpg", "grass.jpg", "evangelion.jpg", 
				"kimono.jpg", "kaneki2.jpg", "vocaloid2.jpg", "neko_yanshoujie.jpg", "macadamia.jpg", "macadamia.jpg", "macadamia.jpg", 
				"macadamia.jpg", "macadamia.jpg", "macadamia.jpg", "macadamia.jpg", "macadamia.jpg", "macadamia.jpg" ,"macadamia.jpg"];


var divItem = function(el, speed, img) {

this.el = el;
this.speed = speed;
this.img = img;
this.el.children[0].setAttribute("src", this.img);
this.startOffset = this.speed*50;

};


divItem.prototype.updatePos = function (scrollDis) {

if (scrollDis < 1200) {scrollDis = 0;};

var spd = (scrollDis)/(this.speed/(this.startOffset/10));
var distanceRemain = this.startOffset-spd;

if (distanceRemain < 0) {distanceRemain = 0};

this.el.style.transform = "translateY(" + distanceRemain + "px)"; 

};

/// create div objects with element reference, data-speed attribute and imagesource

function prepareArrays() { 
for (i = 0; i < divs.length; i++) {

divArray.push(new divItem(divs[i], divs[i].getAttribute("data-offset"), imgArray[i]));

};
}


window.onscroll = function() {

var playarea = document.querySelector("#play-area");
var navbar = document.querySelector("#navbar");
var Yoffset = this.pageYOffset;

var button = document.querySelector("#bootstrapButton");
button.innerHTML = Yoffset;

if (Yoffset > 0) {
navbar.style.backgroundColor = "rgba(106, 111, 120, 0.3)"; 

} else if (Yoffset > 528) {
navbar.style.visibility = "hidden";
}

else {
navbar.style.backgroundColor = "";
navbar.style.visibility = "visible";
}

divArray.forEach(function(el){

el.updatePos(Yoffset);

});
}

//////////////////audio//////////////////////
////////////////////////////////////////////


function buildColorArr() {

var colorArr = [];

for (var i = 0; i <= 6; i++) {

// var r = Math.floor((Math.random() * 200) + 50);
// var g = Math.floor((Math.random() * 200) + 50);
// var b = Math.floor((Math.random() * 200) + 50);
var r = 255;
var g = 255;
var b = 255;

var rgbCode = "rgba(" + r + ", " + g + ", " + b + ", " + 0.6 + ")";
colorArr.push(rgbCode);

}
return colorArr;
}

var colorArray = buildColorArr();


var analyser = function(source, fps, element) {

this.fpsInterval = 10000/fps;
this.element = element;
this.audio = new Audio();
this.audio.src = source;
this.audio.controls = false;
this.isPlaying = false;

}

analyser.prototype.buildframeArray = function() {
// var origin = 6;
for (var i= 0; i < 14; i++) {
frameArray[i] = Math.floor((Math.random() * 60) + 30);
}	
}

analyser.prototype.buildOriginArray = function(max, min) {
var originArray = [];

for (var i = 0; i < 7; i++) {

var num = Math.random() * (max - min) + min;	
originArray.push(num);
}

return originArray;

}

analyser.prototype.barlizer = function() {
now = Date.now();
elapsed = now - then;

if (this.isPlaying && elapsed > fpsInterval) {
then = now - (elapsed % fpsInterval);

this.buildframeArray();

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillstyle = "white";
bars = 20;
for (var i = 0; i < bars; i++) {

bar_x = i*20;
bar_width = 20;
bar_height = -(frameArray[i]);
ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

}
}
}

analyser.prototype.circalizer = function() {

var lastend = 0;
var data = [30, 30, 30, 30, 30, 30];
var myTotal = 0;
var myColor = colorArray;


for(var e = 0; e < data.length; e++)
{
  myTotal += data[e];
}

now = Date.now();
elapsed = now - then;

if (this.isPlaying && elapsed > fpsInt) {

then = now - (elapsed % fpsInt);

this.buildframeArray();
var origins = this.buildOriginArray(1, 1);

ctx.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < data.length; i++) {
ctx.fillStyle = myColor[i];
ctx.beginPath();
ctx.moveTo(canvas.width/2,canvas.height/2);
ctx.arc((canvas.width/2),(canvas.height/2),((canvas.height/3)*(frameArray[i]/75)),lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
ctx.lineTo(canvas.width/2,canvas.height/2);
ctx.fill();
lastend += Math.PI*2*(data[i]/myTotal);
}
}
	
}

analyser.prototype.frameLooper = function() {

animationSequence = window.requestAnimationFrame(this.frameLooper.bind(this));

this.circalizer();

}

analyser.prototype.setFps = function() {


fpsInt = this.fpsInterval;
console.log(fpsInt);
then = Date.now();
startTime = then;
this.frameLooper();


}

analyser.prototype.initMp3Player = function() {

document.getElementById(this.element).appendChild(this.audio);
var playButton = document.createElement("BUTTON");
playButton.innerHTML = "Play/Pause";
document.getElementById(this.element).appendChild(playButton);
var self = this;
canvas = document.getElementById("analyser");
ctx = canvas.getContext("2d");
ctx.shadowBlur=20;
ctx.shadowColor= "rgba(255, 255, 255, 1)";
playButton.addEventListener("click", function() {


if (!self.isPlaying) {
	self.audio.play();

	self.isPlaying = true;
	
} else { self.audio.pause(); self.isPlaying = false;}
	
});


this.setFps();
}

var audioOne = new analyser("The Reluctant Heroes.mp3", 90, "audiobox");

audioOne.initMp3Player();


window.onload = function() {

prepareArrays();

var trackRowTwo = document.querySelector("#track-row-two");
var pngTwo = document.querySelector("#pngTwo");

trackRowTwo.addEventListener("mouseover", function() {
pngTwo.style.transform = "translateX(-250px) scale(1.1, 1.1)";
});

trackRowTwo.addEventListener("mouseout", function() {
pngTwo.style.transform = "translateX(-300px)";
});

}




