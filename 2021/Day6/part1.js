let { exampleInput, input } = require("./input")


let days = 80;
let nextState = new Array(input.length).fill(-1)
while (days--) {


    for (var i = 0; i < input.length; i++) {
        const currentFish = input[i]
        if (currentFish === 0) {
            nextState[i] = 6
            nextState.push(8)
        } else {
            nextState[i] = currentFish - 1;
        }
    }
    input = nextState;
    nextState = new Array(input.length).fill(-1)
}

console.log(input, input.length, "exampleInput")