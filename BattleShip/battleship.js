//存储三只战舰的位置

var location1 = Math.floor(Math.random() * 5);  //随机产生0-4的数字
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess; //一个存储用户猜测的变量guess
var hits = 0; //存储击中战舰的次数


var guesses = 0; //存储猜测次数的变量，计数器
var isSunk = false; //是否全部击中开关,默认为否false，记录战舰是否被击沉的变量

while (isSunk == false) {
    guess = prompt("Ready, aim, fire! (enter a number 0-6 or enter q to quit game!):");
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
    } else {
        // 主动退出程序条件
        if (guess === "q") break;
        guesses++; //猜测次数计数器

        if (guess == location1 || guess == location2 || guess == location3) {

            hits++; //击中次数计数器
            alert("hit!");
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }
        } else {
            alert("MISS");
        }
    }
}

var stats = "You took " + guesses + " guesses to sink the battleship, " +
    "which means your shooting accuracy is " + 3 / guesses;
if (guesses > 0) {
    alert(stats);
}

