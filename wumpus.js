var gameboard = {};
//	playerID = 1;
//	wumpusID = 2;
//	bat1ID = 3;
//	bat2ID = 4;
//	pit1ID = 5;
//	pit2ID = 6;
//  golden treasure = 7
var arrows = 8;
var moves = 100;

init();

function init() {
	gameboard[1] = 23;
	gameboard[7] = 3;
	gameboard[2] = getRandomEmptySquare();
	gameboard[3] = getRandomEmptySquare();
	gameboard[4] = getRandomEmptySquare();
	gameboard[5] = getRandomEmptySquare();
	gameboard[6] = getRandomEmptySquare();
	
	document.getElementById('room-3').style.backgroundColor = 'gold';
	document.getElementById('room-23').style.backgroundColor = 'orange';
	document.getElementById('feedback-3').innerHTML = ("You have " + arrows + " arrows");
	document.getElementById('feedback-4').innerHTML = ('Score ' + moves); 
	checkRoom();
}

window.addEventListener('keydown', function(direction) { walk (direction); });

function walk(direction){
	document.getElementById('feedback').innerHTML = ("");
	switch(direction.keyCode) {
		//go right
		case 39:
			if(gameboard[1] % 5 == 0){
				feedback("You are already farthest to the right");
			} else {
				move(gameboard[1] + 1);				
			}
			break;
		//go left
		case 37:
			if((gameboard[1] - 1) % 5 != 0){
				move(gameboard[1] - 1);
			} else {
				feedback("You are already farthest to the left");	
			}
			break;
		//go up
		case 38:
			if((gameboard[1] - 5) > 0){
				move(gameboard[1] - 5);	
			} else {
				feedback("You cannot move higher");	
			}
			break;
		//go down
		case 40:
			if((gameboard[1] + 5) <= 25){
				move(gameboard[1] + 5);
			} else {
				feedback("You are already at the bottom");	
			}
			break;
	}
	checkRoom();
	score();
}