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

// var canvas, ctx, trackNum, audioContx;
var trackNum;
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

for (var i = 0; i <= bars; i++) {

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
	this.trackData = [	{name: "LaLa", song: "/music/Lala.mp3", image: "canvas1.jpg"},
						{name: "Nevada", song: "/music/Nevada.mp3", image: "canvas2.jpg"},
						{name: "FeintWords", song: "/music/FeintWords.mp3", image: "canvas3.jpg"},
						{name: "Reluctant Heroes", song: "/music/ReluctantHeroes192.mp3", image: "canvas4.jpg"},
						{name: "LaLa", song: "/music/Lala.mp3", image: "canvas5.jpg"}						
	]

	this.imageData = {"LaLa": "/images/canvas1.jpg", "Nevada": "/images/canvas2.jpg", "FeintWords": "/images/canvas3.jpg", "Reluctant Heroes": "/images/canvas4.jpg", "LaLa": "/images/canvas5.jpg"};





	

	this.audioQueue = [];
	this.curSong;
	this.secSong;
	this.loadedSongs = [];
	this.trackLocations = {};
}

//make a new Audio element and corresponding analyser object with the track loaded. Push the loaded analyser object into an Array. 

trackLoader.prototype.addTrack = function(source) {

	var songName = this.trackData[(source-1)].song;	 

	this.loadedSongs.push(source);

	var audioSource = new audioTrack(songName);
	var analyser = new analyserObj(audioSource.audio);
	analyser.name = this.trackData[(source-1)].name;
	this.audioQueue.push(analyser);


	this.mapToArray(songName);

	

}

trackLoader.prototype.mapToArray = function(songName) {

	this.trackLocations[songName] = this.audioQueue.length - 1;


}

//Call the prepareContext method on analyserObject in the queue and create a new AudioContext with the track loaded.

trackLoader.prototype.prepareTrack = function(num) {

	this.audioQueue[num].prepareContext();	
	
}

//Attach the audio element and canvas onto the play screen.

trackLoader.prototype.playTrack = function(num) {


this.audioQueue[num].prepareCanvas();

trackNum = 1;

}

trackLoader.prototype.getSongLocation = function(trackNumber) {
	var songName = this.trackData[(trackNumber-1)].song;	
	return this.trackLocations[songName];
}


// var queue = new trackLoader();


// queue.addTrack(1);
// queue.addTrack(2);
// queue.addTrack(3);
// queue.prepareTrack(1);
// queue.prepareTrack(2);
// queue.prepareTrack(3);
// queue.playTrack(1);



function init_eventListeners(nodes, queue) {

var playScreen = document.getElementsByClassName("play-screen");
var canvas = document.getElementsByClassName("canvas");
var songCanvasLocation = {};

var carriers = [].slice.call(nodes); //convert nodelist into array;

for (let i = 0; i < carriers.length; i++) {

carriers[i].addEventListener("click", function(){

var trackNumber = this.getAttribute("data-track"); 
var songLoc; 
var songName = queue.trackData[trackNumber-1].name;


console.log(songCanvasLocation);

if (queue.loadedSongs.indexOf(trackNumber) == -1) {  ///make sure no new audioContext is created for duplicate tracks if there is a duplicate, the canvas screen is brought up again with the previous audio data intact
											
queue.addTrack(trackNumber);

songLoc = queue.getSongLocation(trackNumber); // get the song location in the audioqueue object, this is to map data-track from element with their corresponding location in the array
songCanvasLocation[songName] = songLoc;   // As above function won't be called again when the song is already in the queue, it is important to map their location in a seperate mapping object
queue.prepareTrack(songLoc);

}

queue.playTrack(songCanvasLocation[songName]);

if(classie.has(playScreen[0], "play-screen--hide")) {

classie.remove(playScreen[0], "play-screen--hide");
}

classie.add(playScreen[0], "play-screen--show");
var img = queue.imageData[songName];
canvas[0].style.background = "url('" + img + "')";


});


}
}



function init_change(queue) {

var changeButton = document.getElementById("changeSong");


changeButton.addEventListener("click", function() {


	if (trackNum == 1) {
	
	queue.playTrack(2);
	trackNum = 2;

   } else if (trackNum == 2) {

   	queue.playTrack(3);
   	trackNum = 3;

   } 

});

}



function attachCanvasBehavior() {

var playScreen = document.getElementsByClassName("play-screen");
var canvas = document.getElementsByClassName("canvas");
var button = document.getElementById("testbutton");

var closebutton = document.getElementById("closebutton");


button.addEventListener("click", function() {

if(classie.has(playScreen[0], "play-screen--hide")) {

classie.remove(playScreen[0], "play-screen--hide");
}

classie.add(playScreen[0], "play-screen--show");
// canvas[0].style.background = "url('canvas1.jpg')";

});

closebutton.addEventListener("click", function() {

if(classie.has(playScreen[0], "play-screen--show")) {
	classie.remove(playScreen[0], "play-screen--show");
}

classie.add(playScreen[0], "play-screen--hide");

});

}

window.onload = function() {
attachCanvasBehavior();
var trackCarriers = document.getElementsByClassName("carrier");
var queue = new trackLoader();
init_eventListeners(trackCarriers, queue);

init_change(queue);


}