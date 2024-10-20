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
    // localPlayer.style.left = MapWidth / 2 - localPlayer.offsetWidth / 2 + "px"
    // localPlayer.style.top = MapHeight / 2 - localPlayer.offsetHeight / 2 + "px"
    localPlayer.style.left = "0px"
    localPlayer.style.top = "0px"
    添加玩家移动事件()
    移动相机()
}
var localPlayerX = 0
var localPlayerY = 0
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
    localPlayerX = parseInt(localPlayer.style.left)
    localPlayerY = parseInt(localPlayer.style.top)
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
            localPlayerX = localPlayerX - localPlayerMoveSpeed / 100
        } else {
            localPlayerX = localPlayerX + localPlayerMoveSpeed / 100
        }
        if (localPlayerMoveSpeed < localPlayerMoveSpeedMax) { localPlayerMoveSpeed++ }
        localPlayer.style.left = localPlayerX + "px"
        移动相机()
    }, 0);
}

function Y轴移动(value) {
    clearInterval(StopMove)
    clearInterval(localPlayerMoveY)
    localPlayerMoveY = setInterval(() => {
        if (value == "up") {
            localPlayerY = localPlayerY - localPlayerMoveSpeed / 100
        } else {
            localPlayerY = localPlayerY + localPlayerMoveSpeed / 100
        }
        if (localPlayerMoveSpeed < localPlayerMoveSpeedMax) { localPlayerMoveSpeed++ }
        localPlayer.style.top = localPlayerY + "px"
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
                        localPlayerX = localPlayerX - localPlayerMoveSpeed / 100
                        localPlayer.style.left = localPlayerX + "px"
                        break;
                    case "d":
                        localPlayerX = localPlayerX + localPlayerMoveSpeed / 100
                        localPlayer.style.left = localPlayerX + "px"
                        break;
                    case "w":
                        localPlayerY = localPlayerY - localPlayerMoveSpeed / 100
                        localPlayer.style.top = localPlayerY + "px"
                        break;
                    case "s":
                        localPlayerY = localPlayerY + localPlayerMoveSpeed / 100
                        localPlayer.style.top = localPlayerY + "px"
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
            !D ? clearInterval(localPlayerMoveX) : null
            break;
        case "d":
            !A ? clearInterval(localPlayerMoveX) : null
            break;
        case "w":
            !S ? clearInterval(localPlayerMoveY) : null
            break;
        case "s":
            !W ? clearInterval(localPlayerMoveY) : null
            break;
        default:
            break;
    }
}
var userWidth = window.innerWidth
var userHight = window.innerHeight
var GameMain = document.getElementById("GameMain")

function 移动相机() {
    GameMain.scrollLeft = localPlayerX - userWidth / 2 + 100 + 17.5
    GameMain.scrollTop = localPlayerY - userHight / 2 + 100 + 17.5
}

document.addEventListener("contextmenu",function(e){
    e.preventDefault();
})