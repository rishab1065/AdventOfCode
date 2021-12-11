const input = require("./input").input

let distance = 0;
let depth = 0;
let aim = 0;
for (var i = 0; i < input.length; i++) {

    if (input[i].direction === "forward") {
        distance = distance + input[i].move
        depth = depth + (aim * input[i].move)
    }
    else if (input[i].direction === "up") {
        aim = aim - input[i].move
    }
    else {
        aim = aim + input[i].move
    }
}
console.log(distance * depth)