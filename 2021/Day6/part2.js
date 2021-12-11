let { exampleInput, input } = require("./input")


let days = 256;
let fishCount = {}, newFistCount = {}

input.forEach((days) => {
    fishCount[days] = fishCount[days] + 1 || 1
})


while (days--) {
    Object.keys(fishCount).forEach((currentFishDay) => {
        if (currentFishDay === "0") {
            newFistCount['6'] = fishCount['0']
            newFistCount['8'] = newFistCount['8'] + fishCount['0'] || fishCount['0']
            newFistCount['0'] = 0
        } else {
            const prevFishDay = parseInt(currentFishDay) - 1
            newFistCount[prevFishDay] = newFistCount[prevFishDay] + fishCount[currentFishDay] || fishCount[currentFishDay]
        }
    })
    fishCount = newFistCount;
    newFistCount = {}
}
const result = Object.values(fishCount).reduce((acc, ele) => {
    return acc + ele
}, 0)

console.log(result, "exampleInput")


