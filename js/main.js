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