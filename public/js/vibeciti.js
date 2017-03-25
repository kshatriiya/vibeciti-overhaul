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

}

//////////////////audio//////////////////////
////////////////////////////////////////////

var canvas, ctx, trackNum, audioContx;

//audio track constructor;

var audioTrack = function(source) {

// this.image = image || composition[source.getAttribute("data-track")].image;
this.audio = new Audio();
this.audio.controls = true;
this.audio.src = source;
this.audio.crossorigin = "anonymous";
this.audio.controls = true;
this.isPlaying = false;

}

//analyser object constructor;

function analyserObj(audioSource) {

var canvas, ctx, source, analyser, context;
this.audio = audioSource;	

}

analyserObj.prototype.barlizer = function() {


fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
this.analyser.getByteFrequencyData(fbc_array);
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255, 255, 255, 1)";
bars = 100;

for (var i = 0; i < bars; i++) {

bar_x = i+100;
bar_width = 1;
bar_height = -(fbc_array[i] / 3);
ctx.fillRect(bar_x, canvas.height, bar_width, bar_height/2);

}
}

analyserObj.prototype.frameLooper = function() {

window.requestAnimationFrame(this.frameLooper.bind(this));

this.barlizer();

}


analyserObj.prototype.prepareCanvas = function() {

var sheet = document.getElementById("sheet");

if (sheet.querySelector("#analyser") != null) {
	sheet.removeChild(sheet.childNodes[2]);
	if(sheet.querySelector("#analyser") != null) {
	sheet.removeChild(sheet.childNodes[2]);
	}
}

sheet.appendChild(this.audio);

/////
canvas = document.createElement("canvas");
canvas.id = "analyser";

document.getElementById("sheet").appendChild(canvas);
ctx = canvas.getContext("2d");
ctx.shadowBlur=20;
ctx.shadowColor= "rgba(255, 255, 255, 1)";
/////

this.frameLooper();
}


analyserObj.prototype.prepareContext = function() {
this.context = new AudioContext();
this.analyser = this.context.createAnalyser();
this.source = this.context.createMediaElementSource(this.audio);
this.source.connect(this.analyser);
this.analyser.connect(this.context.destination);
}

//track loader constructor;

function trackLoader() {
	this.trackData = [{name: "LaLa", song: "/music/Lala.mp3", image: "/images/canvas1.jpg"},
						{name: "Nevada", song: "/music/Nevada.mp3", image: "/images/canvas2.jpg"},
						{name: "FeintWords", song: "/music/FeintWords.mp3", image: "/images/canvas1.jpg"}
	]

	this.audioQueue = [];
	this.curSong;
	this.secSong;
}


trackLoader.prototype.addTrack = function(source) {

	var songName = this.trackData[(source-1)].song;
	var audioSource = new audioTrack(songName);

	this.audioQueue.push(new analyserObj(audioSource.audio));
	

}

trackLoader.prototype.prepareTrack = function(num) {
	this.audioQueue[(num-1)].prepareContext();
}

trackLoader.prototype.playTrack = function(num) {


this.audioQueue[(num-1)].prepareCanvas();
trackNum = 1;

}



var queue = new trackLoader();


queue.addTrack(1);
queue.addTrack(2);
queue.addTrack(3);
queue.prepareTrack(1);
queue.prepareTrack(2);
queue.prepareTrack(3);
queue.playTrack(1);




(function() {
	changeButton = document.getElementById("changeSong");
})();


changeButton.addEventListener("click", function() {


	if (trackNum == 1) {
	
	queue.playTrack(2);
	trackNum = 2;

   } else if (trackNum == 2) {

   	queue.playTrack(3);
   	trackNum = 3;

   } 

});

