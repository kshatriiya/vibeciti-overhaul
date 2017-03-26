


////make a layout builder object and export

function init_eventListeners(array, queue) {

var carreirs = array;
var totalCarriers = carriers.length();

for (let i = 0; i <= carriers.length) {

array[i].addEventListener("click", function(){

var trackNumber = this.getAttribute("data-track");
queue.addTrack(trackNumber);
queue.prepareTrack(trackNumber);
queue.playTrack(trackNumber);


})


}

var layoutBuilder = {




	
}