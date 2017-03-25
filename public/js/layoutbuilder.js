
window.onload = function () {

var playScreen = document.getElementsByClassName("play-screen");
var button = document.getElementById("testbutton");
var canvas = document.getElementsByClassName("canvas");
var closebutton = document.getElementById("closebutton");


button.addEventListener("click", function() {

if(classie.has(playScreen[0], "play-screen--hide")) {

classie.remove(playScreen[0], "play-screen--hide");
}

classie.add(playScreen[0], "play-screen--show");
canvas[0].style.background = "url('/images/canvas1.jpg')";

});

closebutton.addEventListener("click", function() {

if(classie.has(playScreen[0], "play-screen--show")) {
	classie.remove(playScreen[0], "play-screen--show");
}

classie.add(playScreen[0], "play-screen--hide");

});

}
