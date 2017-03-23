var divArray = [];
var divs = document.querySelectorAll(".track-box");
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

var imgArray = ["images/touhou.jpg", "images/breaker.jpg", "images/bleach.jpg", "images/kaneki.jpg", "images/fruit.jpg", "images/grass.jpg", "images/evangelion.jpg", 
				"images/kimono.jpg", "images/kaneki2.jpg", "images/vocaloid2.jpg", "images/neko_yanshoujie.jpg", "images/macadamia.jpg"];


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
for (var i = 0; i < divs.length; i++) {

divArray.push(new divItem(divs[i], divs[i].getAttribute("data-offset"), imgArray[i]));

};
}


window.onscroll = function() {

var playarea = document.querySelector("#play-area");
var navbar = document.querySelector("#navbar");
var Yoffset = this.pageYOffset;

// var button = document.querySelector("#bootstrapButton");
// button.innerHTML = Yoffset;

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


var analyser = function(source, element) {

this.element = element;
this.audio = new Audio();
this.audio.src = source;
this.audio.crossorigin = "anonymous";
this.audio.controls = false;
this.isPlaying = false;

}

analyser.prototype.barlizer = function() {

fbc_array = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(fbc_array);
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
bars = 20;
for (var i = 0; i < bars; i++) {

bar_x = i*10;
bar_width = 10;
bar_height = -(fbc_array[i] / 3);
ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

}
}

analyser.prototype.circalizer = function() {

var lastend = 0;
var data = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
var myTotal = 0;
fbc_array = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(fbc_array);

for(var e = 0; e < data.length; e++)
{
  myTotal += data[e];
}

ctx.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < data.length; i++) {

ctx.fillStyle = "white"
ctx.beginPath();
ctx.moveTo(canvas.width/2,canvas.height/2);
ctx.arc((canvas.width/2),(canvas.height/2),((canvas.height/3)*(fbc_array[i]/2)),lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
ctx.lineTo(canvas.width/2,canvas.height/2);
ctx.fill();
lastend += Math.PI*2*(data[i]/myTotal);
}
}	


analyser.prototype.frameLooper = function() {

window.requestAnimationFrame(this.frameLooper.bind(this));

this.barlizer();

}


analyser.prototype.initMp3Player = function() {

document.getElementById(this.element).appendChild(this.audio);
var playButton = document.createElement("BUTTON");
playButton.innerHTML = "Play/Pause";
document.getElementById(this.element).appendChild(playButton);

var self = this;
/////
canvas = document.getElementById("analyser");
ctx = canvas.getContext("2d");
ctx.shadowBlur=20;
ctx.shadowColor= "rgba(255, 255, 255, 1)";
/////
context = new AudioContext();
analyser = context.createAnalyser();
source = context.createMediaElementSource(self.audio);
source.connect(analyser);
analyser.connect(context.destination);

playButton.addEventListener("click", function() {


if (!self.isPlaying) {
	self.audio.play();

	self.isPlaying = true;
	
} else { self.audio.pause(); self.isPlaying = false;}
	
});


this.frameLooper();
}

var audioOne = new analyser("ReluctantHeroes192.mp3", "audiobox");

// audioOne.initMp3Player();


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


// var clockViser = function() {

// var clockArray = [];
// var nameArray = ["One", "Two", "Three"];
// var playarea = document.getElementById("play-area");
// var clockTower = document.createElement("div");
// clockTower.id = "clockTower";



// for (var i = 0; i < 3; i++) {

// var clock = document.createElement("div");
// clock.classList.add("clocks");
// clock.id = "clock" + nameArray[i];
// clockArray.push(clock);
// clockTower.appendChild(clock);

// }

// playarea.appendChild(clockTower);

// }

// clockViser();