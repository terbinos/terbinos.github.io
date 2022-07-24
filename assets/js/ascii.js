"use strict";

var currentAnimation; // an array of frames, the first element should be displayed next.
var interval; // an interval object.
var speed = 250; // interval delay for the animation, initially set to normal.
var size; // font size of the output, initially set to medium by the css file.

window.onload = pageLoad;
// sets up event handlers for all the controls
function pageLoad() {
	document.getElementById("stop").disabled = true;
	document.getElementById("start").onclick = play;
	document.getElementById("stop").onclick = stop;
	document.getElementById("animation").onchange = changeAnimation;
	document.getElementById("fontsize").onchange = changeSize;

	var radio = document.getElementsByName("speed");
	for (var i = 0; i < radio.length; i++) { // using a loop to add event handlers to the 3 radio buttons
		var currentSpeed = radio[i].value;
		radio[i].onclick = (function(currentSpeed) { // update the speed, keep displaying frames during an animation
								return function(){
									speed = currentSpeed;
									if (interval) {
										clearInterval(interval);
									}
									if (document.getElementById("start").disabled){
										interval = setInterval(function() {displayNextFrame(currentAnimation);}, speed);
									}
								};
							})(currentSpeed);
	}
}

// change the animation when a different one is selected
function changeAnimation() {
	var newAnimation = document.getElementById("animation").value;
	var textarea = document.getElementById("text-area");
	textarea.value = ANIMATIONS[newAnimation];
}

// process the animation and display it
function play() {
	document.getElementById("stop").disabled = false;
	document.getElementById("start").disabled = true;
	document.getElementById("animation").disabled = true;
	var textarea = document.getElementById("text-area");
	var allFrames = textarea.value.split("=====\n");
	currentAnimation = allFrames;
	interval = setInterval(function() {displayNextFrame(currentAnimation);}, speed);
}

// stops the animation and displays all frames
function stop() {
	document.getElementById("start").disabled = false;
	document.getElementById("animation").disabled = false;
	changeAnimation();
	clearInterval(interval);
	document.getElementById("stop").disabled = true;
}

// a helper function that displays the next frame
function displayNextFrame(animation) {
	var textarea = document.getElementById("text-area");
	var currentFrame = animation.shift();
	textarea.value = currentFrame;
	animation.push(currentFrame);
	currentAnimation = animation;
}

// change the font size of the output
function changeSize() {
	var size = document.getElementById("fontsize").value;
	document.getElementById("text-area").style.fontSize = size;
}