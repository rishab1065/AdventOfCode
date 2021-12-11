const input = require("./input").input

let count = 0, prevWindowSum = 999999999

for (var i = 0; i < input.length - 2; i++) {
    const currentWindowSum = input[i] + input[i + 1] + input[i + 2]

    if (prevWindowSum < currentWindowSum) {
        count++
    }
    prevWindowSum = currentWindowSum;
}
console.log(count)