const input = require("./input").input

let count = 0;
for (var i = 1; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
        count++
    }
}
console.log(count)