
const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text')
const turnMainMessageTextElementX = document.querySelector('[turn-main-message-text-x')
const turnMainMessageTextElementO = document.querySelector('[turn-main-message-text-o')
const turnSubMessageTextElement = document.querySelector('[turn-sub-message-text')

var oTurn
startGame() 

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    turnMainMessageTextElementX.innerText = 'X'
    turnSubMessageTextElement.innerText = `turn`
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once:  true})
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
        // console.log("winner!")
        turnMainMessageTextElementX.innerText = ''
        turnMainMessageTextElementO.innerText = ''
        turnSubMessageTextElement.innerText = ''
    } else if (isDraw()) {
        endGame(true)
        turnMainMessageTextElementX.innerText = ''
        turnMainMessageTextElementO.innerText = ''
        turnSubMessageTextElement.innerText = ''
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    // CHECK FOR WIN
    // CHECK FOR DRAW
    // SWITCH TURNS
 
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? 'O' : 'X'} Wins!`
    }
    winningMessage.classList.add('show')
}

function isDraw () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
    if (oTurn) {
        turnMainMessageTextElementX.innerText = ''
        turnMainMessageTextElementO.innerText = 'O'
    } else {
        turnMainMessageTextElementO.innerText = ''
        turnMainMessageTextElementX.innerText = 'X'
    }
    // turnMainMessageTextElement.innerText = `${oTurn ? 'O' : 'X'}`
    turnSubMessageTextElement.innerText = `turn`
}

function setBoardHoverClass() {
board.classList.remove(X_CLASS)
board.classList.remove(O_CLASS)
if(oTurn) {
    board.classList.add(O_CLASS)
} else {
    board.classList.add(X_CLASS)
}
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}