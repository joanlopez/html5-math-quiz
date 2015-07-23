var operators = ['+','-','*','/'];

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
	initGameHandlers();
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

function initGameHandlers() {
	// Handling mouse platforms
	$("#a-wrapper").on('vmouseup', handleA);
	$("#b-wrapper").on('vmouseup', handleB);
}

function endGameHandlers() {
	// Unbinding mouse platforms
	$("#a-wrapper").off('vmouseup');
	$("#b-wrapper").off('vmouseup');
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

