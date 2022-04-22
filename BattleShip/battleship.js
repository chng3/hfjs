//存储三只战舰的位置
var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess; //一个存储用户猜测的变量guess
var hits = 0; //存储击中战舰的次数
var guesses = 0; //存储猜测次数的变量，计数器
var isSunk = false; //是否全部击中开关,默认为否false，记录战舰是否被击沉的变量

while(isSunk == false){
    guess = prompt("Ready, aim, fire! (enter a number 0-6):");
    if (guess<0||guess>6){
        alert("Please enter a valid cell number!");
    }else{
        guesses ++;
        if(guess == location1||guess == location2||guess == location3){
            hits ++;
            alert("hit!");
            if (hits == 3){
                isSunk = true;
                alert("You sank my battleship!");
            }
        }else{
            alert("Miss!");
        }
    }
}

var stats = "You took " + guesses + " guesses to sink the battleship, " +
            "which means your shooting accuracy is " + 3/guesses;
alert(stats);
