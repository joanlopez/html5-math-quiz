var operators = ['+','-','*','/'];

var interval;
var timer;
var counter;
var actualExpression;
var actualValue;
var bestScore;

$(document).ready(function() {
	initApp();
});

function initApp() {
	bestScore = window.localStorage.getItem ('math-quiz-bestScore') || 0;
	initMenuHandlers();
	initGameHandlers();
	initMenu();
}

function initMenu() {
	renderBestScore();
	showMenu();
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
	
	newExpression();
}

function newExpression() {
	actualExpression = randomExpression();
	actualValue = Parser.parse(actualExpression).evaluate();
	while(actualValue % 1 !== 0) {
		actualExpression = randomExpression();
		actualValue = Parser.parse(actualExpression).evaluate();
	}
	renderExpression();

	if(timer % 2 == 0) {
		actualA = actualValue;
		actualB = actualValue+1;
	} else {
		actualA = actualValue+1;
		actualB = actualValue;
	}
	renderOptions();
}

function randomExpression() {
	var expression = "";
	for(var i = 0; i < 4; i++) {
		expression = expression + 
								 ' ' + getRandomInt(1,10) +
								 ' ' + getArrayRandomItem(operators);
	}
	expression += ' ' + getRandomInt(1,10);
	return expression;
}

function renderOptions() {
	$("#a").text(actualA);
	$("#b").text(actualB);
}

function startTimer() {
	interval = setInterval(updateTimer,1000);
}

function updateTimer() {
	timer--;
	if(timer <= 0) {
		clearInterval(interval);
		handleTimeout();
	}
	renderTimer();
}

function renderTimer() {
	$("#timer").html("<p>TIEMPO:</p> " + timer);
}

function updateCounter(add) {
	counter += add;
	if(counter < 0) counter = 0;
	renderCounter();
}

function renderCounter() {
	$("#counter").html("<p>PUNTOS:</p> " + counter);
}

function renderExpression() {
	$("#math-quiz").html("<p>PROBLEMA:</p> " + actualExpression);
}

function showMenu() {
	$("#game-container").addClass("hidden");
	$("#end-container").addClass("hidden");
	if($("#menu-container").hasClass("hidden")) {
		$("#menu-container").removeClass("hidden");
	}
}

function showGame() {
	$("#menu-container").addClass("hidden");
	$("#end-container").addClass("hidden");
	if($("#game-container").hasClass("hidden")) {
		$("#game-container").removeClass("hidden");
	}
}

function showEnd() {
	$("#menu-container").addClass("hidden");
	$("#game-container").addClass("hidden");
	if($("#end-container").hasClass("hidden")) {
		$("#end-container").removeClass("hidden");
	}
}

function initGameHandlers() {
	$("#a-wrapper").on('vmouseup', handleA);
	$("#b-wrapper").on('vmouseup', handleB);
}

function initMenuHandlers() {
	$("#playbutton").on('vmouseup', initGame);
}

function handleA() {
	if(actualValue == actualA) updateCounter(8);
	else updateCounter(-7);
	newExpression();
}

function handleB() {
	if(actualValue == actualB) updateCounter(8);
	else updateCounter(-7);	
	newExpression();
}

function handleTimeout() {
	renderActualScore();
	if(counter > bestScore) {
		bestScore = counter;
		window.localStorage.setItem ('math-quiz-bestScore', bestScore);
	}
	showEnd();
	setTimeout(initMenu, 4000);
}

function renderActualScore() {
	$("#actualscore").html("<span>PUNTUACION:</span> " + counter);
}

function renderBestScore() {
	$("#bestscore").html("<span>MEJOR PUNTUACION:</span> " + bestScore);
}

