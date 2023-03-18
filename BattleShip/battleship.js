// view 视图对象负责更新视图
var view = {
    // 这个方法将一个字符串作为参数，并在消息区域中显示它
    displayMessage: function (msg) {
        // 稍后将编写的代码
        document.getElementById("messageArea").innerHTML = msg
    },
    // 这个方法在网格中显示MISS图像
    displayMiss: function (location) {
        // 稍后将编写的代码
        document.getElementById(location).setAttribute("class","miss")
    },
    // 这个方法在网格中显示击中战舰图像
    displayHit: function (location) {
        // 稍后将编写的代码
        document.getElementById(location).setAttribute("class","hit")
    }
}


// model 模型对象存储游戏的状态
var model = {
    // 游戏板网格的大小
    boardSize: 7,
    // 游戏包含的战舰数
    numShips: 3,
    // 战舰所处的位置以及被击中的部位
    ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] } ],
    // 有多少艘战舰已被击沉
    shipsSunk: 0,
    // 每艘战舰占据多少个单元格
    shipLength: 3,

    // 判断玩家猜测的位置是否击中了战舰
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            var ship = this.ships[i]
            var index = ship.locations.indexOf(guess)
            if (index >= 0) {
                // 击中了战舰！
                ship.hits[index] = "hit"
                // 告诉view试图玩家的猜测击中了战舰
                view.displayHit(guess)
                // 告诉view试图显示消息
                view.displayMessage("HIT!")
                // 判断战舰是否已经被击沉
                if(this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!")
                    this.shipsSunk++
                }
                return true;
            }
        }
        // 否则没有击中任何战舰，因此返回false
        // 调用view或者说告诉view试图玩家的猜测没有击中战舰
        view.displayMiss(guess)
        // 告诉view试图显示消息
        view.displayMessage("You missed!")
        return false

    },
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            // 只要有任何部位未被击中，战舰就还浮在水面上，因此返回false
            if(ship.hits[i]!= "hit"){
                return false
            }
        }
        // 否则，战舰已被击沉，因此返回true
        return true
    },
    // 循环创建足够的战舰（战舰位置是随机产生的）
    generateShipLocations: function () {
        var locations
        for (var i = 0; i < this.numShips;i++){
            do {
                locations = this.generateShip()
            } while (this.collision(locations))
            this.ships[i].locations = locations
        }
    },
    // 创建一个数组，其中包含一艘战舰的随机位置
    generateShip: function () {
        var direction = Math.floor(Math.random()*2)
        var row,col
        // 如果direction为1，就意味着要创建一艘水平放置的战舰
        if(direction === 1) {
            // 生成水平战舰的起始位置
            row = Math.floor(Math.random()*this.boardSize)
            // col = Math.floor(Math.random()*this.boardSize-2)
            col = Math.floor(Math.random() * (this.boardSize-this.shipLength+1)) // 将数字2替换成 shipLength + 1，让代码更通用，支持任何战舰长度
        } else {
            // 生成垂直战舰的起始位置
            // row = Math.floor(Math.random()*this.boardSize-2)
            row = Math.floor(Math.random()*(this.boardSize-this.shipLength+1))
            col = Math.floor(Math.random()*this.boardSize)
        }
        var newShipLocations = []
        for (var i = 0; i < this.shipLength; i++) {
            if(direction === 1) {
                newShipLocations.push(row + "" + (col+i))
            } else {
                newShipLocations.push((row+i) + "" + col)
            }
            
        }
        return newShipLocations
    },
    // 检测是否与游戏板中既有的战舰重叠
    collision: function (locations) {
        for (let i = 0; i < this.numShips; i++) {
            var ship = model.ships[i]
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true
                }
            }
        }
        return false
    }
}

// 实现控制器
var controller = {
    // 记录猜测次数
    guesses: 0,
    // 对猜测位置进行处理，再将结果交给模型；检测游戏是否结束
    processGuess: function (guess) {
        var location = parseGuess(guess)
        if (location) {
            this.guesses++
            // 以字符串的方式将行号和列号传递给model对象的方法fire，仅当击中战舰时，方法fire才返回true
            var hit = model.fire(location)
            // 判断游戏是否结束
            if (hit && model.shipsSunk === model.numShips ) {
                view.displayMessage("You sank all my battleship, in " + this.guesses + " guesses")
            }
        }
    }
    
}

// 辅助函数 - 处理从玩家获取的猜测的代码,判断是否有效
function parseGuess (guess) {
    // 需要将用户输入的字符串的第一个所有可能出现的英文字符都放在字符串数组中，以便后续根据需求利用转化
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]
    if(guess.length !==2 || guess === null){
        alert("Oops, please enter a letter and a number on the board.")
    } else {
        firstChar = guess.charAt(0)
        // 结合数组和
        var row = alphabet.indexOf(firstChar)
        var column = guess.charAt(1)

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.")
        } else if (row<0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
                alert("Oops, that's off the board!")
        } else {
            return row + column
        }
    }
    return null
}

// 创建初始化函数init
function init() {
    var fireButton = document.getElementById("fireButton")
    fireButton.onclick = handleFireButton
    var guessInput = document.getElementById("guessInput")
    guessInput.onkeypress = handleKeyPress

    model.generateShipLocations()
}

// 获取表单中的玩家输入并交给控制器
function handleFireButton() {
    var guessInput = document.getElementById("guessInput")
    // 提交给控制器处理
    controller.processGuess(guessInput.value)
    // 将表单输入元素的值重置为空字符串
    guessInput.value = ""
}

// 处理HTML输入字段的按键事件
function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton")
    if(e.keyCode === 13) {
        fireButton.click();
        return false
    }
}

window.onload = init



// 测试view对象
// view.displayMiss("00")
// view.displayMiss("34")
// view.displayMiss("55"); 
// view.displayHit("12"); 
// view.displayMiss("25"); 
// view.displayHit("26");

// // 测试model对象
// model.fire("53")

// model.fire("06")
// model.fire("16")
// model.fire("26")

// model.fire("34")
// model.fire("24")
// model.fire("44")

// model.fire("12")
// model.fire("11")
// model.fire("10")

// 测试检测数字是否有效
// console.log(parseGuess("A0"))
// console.log(parseGuess("B6"))
// console.log(parseGuess("G3"))
// console.log(parseGuess("H0"))
// console.log(parseGuess("A7"))

// 测试控制器
// controller.processGuess("A0")
// controller.processGuess("A4")

// controller.processGuess("A6")
// controller.processGuess("B6")
// controller.processGuess("C6")

// controller.processGuess("C4")
// controller.processGuess("D4")
// controller.processGuess("E4")

// controller.processGuess("B0")
// controller.processGuess("B1")
// controller.processGuess("B2")
