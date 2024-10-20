window.onload = function () {
    创建本地玩家()
}

var gameBody = document.getElementById("gameBody")
var MapWidth = gameBody.scrollWidth
var MapHeight = gameBody.scrollHeight
var localPlayer = document.getElementById("local-player")
function 创建本地玩家() {
    gameBody.innerHTML += "<span id='local-player' class='local-player player'></span>"
    localPlayer = document.getElementById("local-player")
    localPlayer.style.left = MapWidth / 2 - localPlayer.offsetWidth / 2 + "px"
    localPlayer.style.top = MapHeight / 2 - localPlayer.offsetHeight / 2 + "px"
    // localPlayer.style.left = "0px"
    // localPlayer.style.top = "0px"
    添加玩家移动事件()
    移动相机()
}
var localPlayerPos = {}
Object.defineProperties(localPlayerPos, {
    X: {
        get: function () {
            return X
        },
        set: function (value) {
            X = value;
            if (X < 0) {
                X = 0
            } else if (X > MapWidth - localPlayer.offsetWidth) {
                X = MapHeight - localPlayer.offsetHeight
            }
        }
    },
    Y: {
        get: function () {
            return Y
        },
        set: function (value) {
            Y = value;
            if (Y < 0) {
                Y = 0
            } else if (Y > MapHeight - localPlayer.offsetHeight) {
                Y = MapHeight - localPlayer.offsetHeight
            }
        }
    }
});
// var localPlayerX = 0
// var localPlayerY = 0
var localPlayerMoveX
var localPlayerMoveY
const localPlayerMoveSpeedMax = 99
const localPlayerMoveSpeedMin = 10
var localPlayerMoveSpeed = localPlayerMoveSpeedMin
var W = false
var A = false
var S = false
var D = false
var NowKey = "a"
var StopMove
function 添加玩家移动事件() {
    localPlayerPos.X = parseInt(localPlayer.style.left)
    localPlayerPos.Y = parseInt(localPlayer.style.top)
    localPlayer = document.getElementById("local-player")
    document.addEventListener("keydown", function () {
        if (event.key == "a") {
            if (!A) {
                A = true
                X轴移动("right")
            }
        } else if (event.key == "d") {
            if (!D) {
                D = true
                X轴移动()
            }
        } else if (event.key == "w") {
            if (!W) {
                W = true
                Y轴移动("up")
            }
        } else if (event.key == "s") {
            if (!S) {
                S = true
                Y轴移动()
            }
        }
    })

    document.addEventListener("keyup", function () {
        if (event.key == "a") {
            A = false
            NowKey = event.key
            停止移动(event.key)
        } else if (event.key == "d") {
            D = false
            NowKey = event.key
            停止移动(event.key)
        } else if (event.key == "w") {
            W = false
            NowKey = event.key
            停止移动(event.key)
        } else if (event.key == "s") {
            S = false
            NowKey = event.key
            停止移动(event.key)
        }
    })
}

function X轴移动(value) {
    clearInterval(StopMove)
    clearInterval(localPlayerMoveX)
    localPlayerMoveX = setInterval(() => {
        if (value == "right") {
            localPlayerPos.X = localPlayerPos.X - localPlayerMoveSpeed / 100
        } else {
            localPlayerPos.X = localPlayerPos.X + localPlayerMoveSpeed / 100
        }
        if (localPlayerMoveSpeed < localPlayerMoveSpeedMax) { localPlayerMoveSpeed++ }
        localPlayer.style.left = localPlayerPos.X + "px"
        移动相机()
    }, 0);
}

function Y轴移动(value) {
    clearInterval(StopMove)
    clearInterval(localPlayerMoveY)
    localPlayerMoveY = setInterval(() => {
        if (value == "up") {
            localPlayerPos.Y = localPlayerPos.Y - localPlayerMoveSpeed / 100
        } else {
            localPlayerPos.Y = localPlayerPos.Y + localPlayerMoveSpeed / 100
        }
        if (localPlayerMoveSpeed < localPlayerMoveSpeedMax) { localPlayerMoveSpeed++ }
        localPlayer.style.top = localPlayerPos.Y + "px"
        移动相机()
    }, 0);
}

function 停止移动(value) {
    if (!W && !A && !S && !D) {
        StopMove = setInterval(() => {
            if (localPlayerMoveSpeed > localPlayerMoveSpeedMin) {
                localPlayerMoveSpeed--
                switch (NowKey) {
                    case "a":
                        localPlayerPos.X = localPlayerPos.X - localPlayerMoveSpeed / 100
                        localPlayer.style.left = localPlayerPos.X + "px"
                        break;
                    case "d":
                        localPlayerPos.X = localPlayerPos.X + localPlayerMoveSpeed / 100
                        localPlayer.style.left = localPlayerPos.X + "px"
                        break;
                    case "w":
                        localPlayerPos.Y = localPlayerPos.Y - localPlayerMoveSpeed / 100
                        localPlayer.style.top = localPlayerPos.Y + "px"
                        break;
                    case "s":
                        localPlayerPos.Y = localPlayerPos.Y + localPlayerMoveSpeed / 100
                        localPlayer.style.top = localPlayerPos.Y + "px"
                        break;
                    default:
                        break;
                }
            } else if (localPlayerMoveSpeed == localPlayerMoveSpeedMin) {
                clearInterval(StopMove)
            }
            移动相机()
        }, 0);
    }
    switch (value) {
        case "a":
            !D ? clearInterval(localPlayerMoveX) : X轴移动()
            break;
        case "d":
            !A ? clearInterval(localPlayerMoveX) : X轴移动("right")
            break;
        case "w":
            !S ? clearInterval(localPlayerMoveY) : Y轴移动()
            break;
        case "s":
            !W ? clearInterval(localPlayerMoveY) : Y轴移动("up")
            break;
        default:
            break;
    }
}
var userWidth = window.innerWidth
var userHight = window.innerHeight
var GameMain = document.getElementById("GameMain")

function 移动相机() {
    GameMain.scrollLeft = localPlayerPos.X - userWidth / 2 + 100 + 17.5
    GameMain.scrollTop = localPlayerPos.Y - userHight / 2 + 100 + 17.5
}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
})