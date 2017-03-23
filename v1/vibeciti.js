window.onscroll = function() {

var playarea = document.querySelector("#play-area");
var navbar = document.querySelector("#navbar");
var Yoffset = this.pageYOffset;

if(Yoffset > 0) {

// navbar.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
navbar.style.backgroundColor = "rgba(106, 111, 120, 0.3)";
playarea.style.filter = "grayscale(0)";
} else {

navbar.style.borderBottom = "";
navbar.style.backgroundColor = "";
}


}

window.onload = function() {

var visualizer = document.querySelector("#visualizer");

visualizer.addEventListener("click", function() {

this.style.animation = "1.5s linear 0s dissolve"

})




}