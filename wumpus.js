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

function getRandomEmptySquare(){
	while(true){		
		var x = Math.floor(Math.random() * 25) + 1; // Generates the gameboard
		if((gameboard[1] != x) &&
		(gameboard[2] != x) &&
		(gameboard[3] != x) &&
		(gameboard[4] != x) &&
		(gameboard[5] != x) &&
		(gameboard[6] != x) &&
		(gameboard[7] != x))
			return x;
	}
}

function isSquareEmpty(squareNum){
	for(var i in gameboard){ 
		if(squareNum == gameboard[i]) {
			return false; // The square EXISTS in the array
		}
	}
	return true; // The square does NOT EXIST in the array
}

function move(to){
	if(isSquareEmpty(to)){
		updateUI(gameboard[1], to); // Updates where the player will go
		gameboard[1] = to; // Stores the new position
	}
	else{
		if(to == gameboard[2]){
			redroom(gameboard[1], to);
			alert("You are dead!! Wumpus ate you.");
			newGame();
		}
		else if((to == gameboard[3]) || (to == gameboard[4])){
			alert("The bat takes you to another part of the cave");
			var newroom = getRandomEmptySquare();
			updateUI(gameboard[1], newroom); 
			gameboard[1] = newroom; 			
		}
		else if(to == gameboard[7]) {
			gameboard[7] = 0;
			updateUI(gameboard[1], to);
			gameboard[1] = to;
			moves = moves + 20;
		}
		else {
			document.getElementById('room-' + gameboard[1]).style.backgroundColor = 'lightgreen';
			document.getElementById('room-' + to).style.backgroundColor = 'red';
			alert("You fall and hurt yourself badly, almost dying.");
			newGame();
		}
	}	
}

function checkRoom(){
	if(gameboard[1] % 5 != 0) {
		//check right
		if(gameboard[1] + 1 == gameboard[2]){
			feedback("You smell the Wumpus!");
		} else if ((gameboard[1] + 1 == gameboard[3]) || (gameboard[1] + 1 == gameboard[4])){
			feedback("You hear wings flapping!");
		} else if ((gameboard[1] + 1 == gameboard[5]) || (gameboard[1] + 1 == gameboard[6])){
			feedback("You feel a draft from a pit!");
		}
	}
	if((gameboard[1] - 1) % 5 != 0) {
		//check left
		if(gameboard[1] - 1 == gameboard[2]){
			feedback("You smell the Wumpus!");
		} else if ((gameboard[1] - 1 == gameboard[3]) || (gameboard[1] - 1 == gameboard[4])){
			feedback("You hear wings flapping!");
		} else if ((gameboard[1] - 1 == gameboard[5]) || (gameboard[1] - 1 == gameboard[6])){
			feedback("You feel a draft from a pit!");
		}
	}
	if((gameboard[1] - 5) > 0) {
		//check up
		if(gameboard[1] - 5 == gameboard[2]){
			feedback("You smell the Wumpus!");
		} else if ((gameboard[1] - 5 == gameboard[3]) || (gameboard[1] - 5 == gameboard[4])){
			feedback("You hear wings flapping!");
		} else if ((gameboard[1] - 5 == gameboard[5]) || (gameboard[1] - 5 == gameboard[6])){
			feedback("You feel a draft from a pit!");
		}
	}
	if((gameboard[1] + 5) <= 25) {
		//check down
		if(gameboard[1] + 5 == gameboard[2]){
			feedback("You smell the Wumpus!");
		} else if ((gameboard[1] + 5 == gameboard[3]) || (gameboard[1] + 5 == gameboard[4])){
			feedback("You hear wings flapping!");
		} else if ((gameboard[1] + 5 == gameboard[5]) || (gameboard[1] + 5 == gameboard[6])){
			feedback("You feel a draft from a pit!");
		}
	}
}
