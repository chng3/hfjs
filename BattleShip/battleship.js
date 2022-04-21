//存储战舰的位置
var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while(!isSunk){
    guess = prompt("Ready, aim, fire! (enter a number 0-6):");
    if (guess<0||guess>6){
        alert("Please enter a valid cell number!");
    }else{
        guesses ++;
        if(guess == location1){
            hits ++;
            alert("hit!");
        }
        else if(guess == location2){
            hits ++;
            alert("hit!");
        }
        else if(guess == location3){
            hits ++;
            alert("hit!");
        }
        if (hits == 3){
            isSunk = true;
            alert("You sank my battleship!"+" and spend " + guesses + " times!");
        }

    }
}
