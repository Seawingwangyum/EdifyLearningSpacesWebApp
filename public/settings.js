/**
* Function to open or close 
* @param {string} box - 
* @param {string} box2 - 
* @param {string} value - 
*/
function openOrClose(box, box2, value) {
	document.getElementById(box).style.display=value;
	document.getElementById(box2).style.display=value;
}