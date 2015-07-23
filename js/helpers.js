function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomItem(items) {
	var random = getRandomInt(0, items.length-1);
	return items[random];		
}