window.onload = function () {
    创建本地玩家()
    鼠标脱出暂停()
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
var localPlayerInfo = {}
Object.defineProperties(localPlayerInfo, {
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
    },
    Speed: {
        get: function () {
            return Speed
        },
        set: function (value) {
            Speed = value;
            显示速度(Speed)
        }
    }
});
// var localPlayerX = 0
// var localPlayerY = 0
var localPlayerMoveX
var localPlayerMoveY
const localPlayerMoveSpeedMax = 100
const localPlayerMoveSpeedMin = 10
localPlayerInfo.Speed = localPlayerMoveSpeedMin
var W = false
var A = false
var S = false
var D = false
var NowKey = "A"
var StopMove
var UserMouseLeave = false

function DaXie(value) {
    return value.toUpperCase()
}

function 键盘按下() {
    if (event.key) {
        NowKey = DaXie(event.key)
        if (DaXie(event.key) == "A") {
            if (!A) {
                A = true
                X轴移动("right")
            }
        } else if (DaXie(event.key) == "D") {
            if (!D) {
                D = true
                X轴移动()
            }
        } else if (DaXie(event.key) == "W") {
            if (!W) {
                W = true
                Y轴移动("up")
            }
        } else if (DaXie(event.key) == "S") {
            if (!S) {
                S = true
                Y轴移动()
            }
        }
    }
}

function 键盘抬起() {
    NowKey = DaXie(event.key)
    if (DaXie(event.key) == "A") {
        A = false
    } else if (DaXie(event.key) == "D") {
        D = false
    } else if (DaXie(event.key) == "W") {
        W = false
    } else if (DaXie(event.key) == "S") {
        S = false
    }
    停止移动(DaXie(event.key))
}

function 添加玩家移动事件() {
    localPlayerInfo.X = parseInt(localPlayer.style.left)
    localPlayerInfo.Y = parseInt(localPlayer.style.top)
    localPlayer = document.getElementById("local-player")
    document.addEventListener("keydown", 键盘按下, true)

    document.addEventListener("keyup", 键盘抬起, true)
}

function X轴移动(value) {
    clearInterval(StopMove)
    clearInterval(localPlayerMoveX)
    localPlayerMoveX = setInterval(() => {
        if (!UserMouseLeave) {
            if (value == "right") {
                localPlayerInfo.X = localPlayerInfo.X - localPlayerInfo.Speed / 100
            } else {
                localPlayerInfo.X = localPlayerInfo.X + localPlayerInfo.Speed / 100
            }
            if (localPlayerInfo.Speed < localPlayerMoveSpeedMax) { localPlayerInfo.Speed++ }
            localPlayer.style.left = localPlayerInfo.X + "px"
            移动相机()
        } else {
            停止移动(null)
        }
    }, 0);
}

function Y轴移动(value) {
    clearInterval(StopMove)
    clearInterval(localPlayerMoveY)
    localPlayerMoveY = setInterval(() => {
        if (!UserMouseLeave) {
            if (value == "up") {
                localPlayerInfo.Y = localPlayerInfo.Y - localPlayerInfo.Speed / 100
            } else {
                localPlayerInfo.Y = localPlayerInfo.Y + localPlayerInfo.Speed / 100
            }
            if (localPlayerInfo.Speed < localPlayerMoveSpeedMax) { localPlayerInfo.Speed++ }
            localPlayer.style.top = localPlayerInfo.Y + "px"
            移动相机()
        } else {
            停止移动(null)
        }
    }, 0);
}

function 停止移动(value) {
    clearInterval(StopMove)
    if (UserMouseLeave) {
        A = false
        D = false
        W = false
        D = false
        clearInterval(localPlayerMoveX)
        clearInterval(localPlayerMoveY)
        localPlayerInfo.Speed = localPlayerMoveSpeedMin
        显示速度()
    }
    if (!W && !A && !S && !D) {
        StopMove = setInterval(() => {
            if (localPlayerInfo.Speed > localPlayerMoveSpeedMin) {
                localPlayerInfo.Speed--
                switch (NowKey) {
                    case "A":
                        localPlayerInfo.X = localPlayerInfo.X - localPlayerInfo.Speed / 100
                        localPlayer.style.left = localPlayerInfo.X + "px"
                        break;
                    case "D":
                        localPlayerInfo.X = localPlayerInfo.X + localPlayerInfo.Speed / 100
                        localPlayer.style.left = localPlayerInfo.X + "px"
                        break;
                    case "W":
                        localPlayerInfo.Y = localPlayerInfo.Y - localPlayerInfo.Speed / 100
                        localPlayer.style.top = localPlayerInfo.Y + "px"
                        break;
                    case "S":
                        localPlayerInfo.Y = localPlayerInfo.Y + localPlayerInfo.Speed / 100
                        localPlayer.style.top = localPlayerInfo.Y + "px"
                        break;
                    default:
                        break;
                }
                显示速度()
            } else {
                clearInterval(StopMove)
                return
            }
            移动相机()
        }, 0);
    }
    switch (value) {
        case "A":
            !D ? clearInterval(localPlayerMoveX) : X轴移动()
            break;
        case "D":
            !A ? clearInterval(localPlayerMoveX) : X轴移动("right")
            break;
        case "W":
            !S ? clearInterval(localPlayerMoveY) : Y轴移动()
            break;
        case "S":
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
    GameMain.scrollLeft = localPlayerInfo.X - userWidth / 2 + 100 + 17.5
    GameMain.scrollTop = localPlayerInfo.Y - userHight / 2 + 100 + 17.5
}

function 显示速度(value) {
    var SpeedInfo = document.querySelector(".version-info p:nth-child(2)")
    if(value){
        SpeedInfo.innerText = `当前速度:${value}`
    }
    
}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    //拦截网页右键
})

function 鼠标脱出暂停() {
    document.onmouseout = function () {
        UserMouseLeave = true
        document.removeEventListener("keydown", 键盘按下, true)
        document.removeEventListener("keyup", 键盘抬起, true)
    }
    document.onmouseover = function () {
        UserMouseLeave = false
        添加玩家移动事件()
    }
}