const fs = require("fs")

const input = fs.readFileSync("./input.txt", { encoding: 'utf8', flag: 'r' }).trim()
    .split('\n').map((line) => { return line.trim().split("|").map((ele) => ele.trim().split(" ")) })

console.log(input, "")

var signalMap = [
    'abcefg', // 0
    'cf', // 1
    'acdeg', // 2
    'acdfg', // 3
    'bcdf', // 4
    'abdfg', // 5
    'abdefg', // 6
    'acf', // 7
    'abcdefg', // 8
    'acbdfg', // 9
]

let result = 0
for (var i = 0; i < input.length; i++) {

    const output = input[i][1];

    output.forEach((signal) => {
        console.log(signal, "signal")
        if (signalMap[1].length == signal.length ||
            signalMap[4].length == signal.length ||
            signalMap[7].length == signal.length ||
            signalMap[8].length == signal.length) {
            result++
        }
    })

}
console.log(result)