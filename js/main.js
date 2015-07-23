var interval;
var timer;
var counter;
var actualExpression;
var actualValue;

$(document).ready(function() {
	initApp();
});

function initApp() {
	initGame();
}

function initGame() {
	showGame();
	setEnvironment();	
	startTimer();
}

function setEnvironment() {
	timer = 60;
	renderTimer();

	counter = 0;
	renderCounter();
	
	actualExpression = randomExpression();
	renderExpression();

	actualValue = Parser.parse(actualExpression).evaluate();
}

function startTimer() {
	interval = setInterval(updateTimer,1000);
}

function updateTimer() {
	timer--;
	if(timer <= 0) {
		clearInterval(interval);
	}
	renderTimer();
}

function renderTimer() {
	$("#timer").html("<p>TIEMPO:</p> " + timer);
}

function updateCounter(add) {
	counter += add;
	renderCounter();
}

function renderCounter() {
	$("#counter").html("<p>PUNTOS:</p> " + counter);
}

function renderExpression() {
	$("#math-quiz").html("<p>PUNTOS:</p> " + actualExpression);
}

function showMenu() {
	$("#game-container").addClass("hidden");
	if($("#menu-container").hasClass("hidden")) {
		$("#menu-container").removeClass("hidden");
	}
}

function showGame() {
	$("#menu-container").addClass("hidden");
	if($("#game-container").hasClass("hidden")) {
		$("#game-container").removeClass("hidden");
	}
}

