
window.addEventListener('keydown', function(aim) { shoot (aim); });
function shoot(aim){
	if(arrows > 0){
		var hit = false;
		switch(aim.keyCode){
			case 68:
				if(gameboard[1] % 5 != 0){
					if((gameboard[1] + 1) == (gameboard[2])){
						hit = true;
					} else {
						miss();
					}
				} else {
					feedback("Sorry, you can't shoot into the wall.");
				}
				break;
			case 65:
				if((gameboard[1] - 1) % 5 != 0){
					if((gameboard[1] - 1) == gameboard[2]){
						hit = true;
					} else {
						miss();
					}
				} else {
					feedback("You can't shoot into the wall.");
				}
				break;
			case 87:
				if((gameboard[1] - 5) > 0){
					if((gameboard[1] - 5) == gameboard[2]){
						hit = true; 
					} else {
						miss();
					}
				} else {
					feedback("You can't shoot into the wall.");
				}
				break;
			case 83:
				if((gameboard[1] + 5) < 26){
					if((gameboard[1] + 5) == gameboard[2]){
						hit = true;
					} else {
						miss();
					}
				} else {
					feedback("You can't shoot into the wall.");
				}
				break;
		}
		
		if (hit == true){
			alert("HIT!!! You killed the Wumpus, you're awesome! \n Score " + moves);
			newGame();
		}
		
	} else {
		alert("Game over, you're out of arrows!");
		newGame();
	}
}	

function updateUI(oldroom, newroom){
	document.getElementById('room-' + oldroom).style.backgroundColor = 'lightgreen';
	var x = window.innerWidth;
	if (x < 321){
		document.getElementById('room-' + oldroom).style.backgroundColor = '#cecece';
	}
	document.getElementById('room-' + newroom).style.backgroundColor = 'orange';	
}	

function miss(){
	feedback("MISS! Wumpus moves!");
	arrows--;
	score();
	document.getElementById('feedback-3').innerHTML = ("You have " + arrows + " arrows left"); 
	gameboard[2] = getRandomEmptySquare();
}

function newGame(){
	playAgain = confirm("Do you want to play again?");
	if (playAgain == true) {
		location.reload();		
	}	
}

function redroom(greyroom, to){
	document.getElementById('room-' + greyroom).style.backgroundColor = '#cecece';
	document.getElementById('room-' + to).style.backgroundColor = 'red';
}

function score(){
	moves--;
	document.getElementById('feedback-4').innerHTML = ('Score ' + moves);
}

function feedback(t1) { 
	var text = document.getElementById('feedback'); 
	text.innerHTML = text.innerHTML + t1 + "<br/><br/>"; // To allow multiple warnings at once
}