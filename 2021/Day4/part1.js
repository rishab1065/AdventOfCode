const fs = require("fs")

const input = fs.readFileSync("./input.txt", { encoding: 'utf8', flag: 'r' }).trim()
    .split('\n')
const series = input[0].split(",").map((num) => parseInt(num))
let boards = [], currentBoard = []
input.forEach((element, index) => {

    if (index > 1 && element !== "") {
        currentBoard.push(element.split(/\s+/g).map((num) => parseInt(num)))
    }

    if (index > 1 && element === "") {
        boards.push(currentBoard)
        currentBoard = []
    }
})

let winingBoard = false;
let lastNumber = false;
for (let i = 0; i < series.length; i++) {
    const currentNumber = series[i]
    for (let b = 0; b < boards.length; b++) {
        const currentBoard = boards[b]
        for (let j = 0; j < currentBoard.length; j++) {
            for (let k = 0; k < currentBoard.length; k++) {
                if (currentNumber === currentBoard[j][k]) {
                    currentBoard[j][k] = -1;
                }
            }
        }
        // console.log(currentBoard)
        if (checkLine(currentBoard)) {
            winingBoard = currentBoard
            lastNumber = currentNumber;
            break;
        }
    }
    if (winingBoard) {
        break;
    }
}

console.log(winingBoard, lastNumber)
console.log(calculateResult(winingBoard, lastNumber))



function calculateResult(board, number) {
    let result = 0
    for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board.length; k++) {
            if (board[j][k] !== -1) {
                result += board[j][k]
            }
        }
    }
    return result * number
}


function checkLine(board) {
    let isWiningBoard = false
    for (let j = 0; j < board.length; j++) {
        let sumRow = 0, sumCol = 0;
        for (let k = 0; k < board.length; k++) {
            sumRow += board[j][k]
            sumCol += board[k][j]
        }

        if (sumCol === -5 || sumRow === -5) {
            isWiningBoard = true
            break
        }
    }
    return isWiningBoard
}

