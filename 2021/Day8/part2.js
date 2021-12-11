const fs = require('fs');

function readInput(path = "input.txt", encoding = "utf8", flag = "r") {
	return fs.readFileSync(path, { encoding, flag });
};

function saveOutput(data, path = "output.txt", encoding = "utf8", flag = "w") {
	fs.writeFileSync(path, data, { encoding, flag });
};

const digitsOutputs = [
	"012456",
	"25",
	"02346",
	"02356",
	"1235",
	"01356",
	"013456",
	"025",
	"0123456",
	"012356"
];

const allLetters = [
	"a", "b", "c", "d", "e", "f", "g"
];

/*
 000
1   2
1   2
 333
4   5
4   5
 666
*/

const digitInputs = new Array(9).fill("");


const input = readInput();
const lines = input.split(/\r/).join("").split("\n");
const inputWires = lines.map(x => x.split(" | ")[0].split(" "));
const digits = lines.map(x => x.split(" | ")[1].split(" "));
let result = 0;
let i = 0;
for(const inputDigits of inputWires) {
	const outputMap = {};
	const fives = [];
	const sixes = [];
	for(const digit of inputDigits) {
		if(digit.length == 2) digitInputs[1] = digit;
		if(digit.length == 3) digitInputs[7] = digit;
		if(digit.length == 4) digitInputs[4] = digit;
		if(digit.length == 5 && !fives.includes(digit)) fives.push(digit);
		if(digit.length == 6 && !sixes.includes(digit)) sixes.push(digit);
	};
	for(const letter of digitInputs[7].split("")) {
		if(!digitInputs[1].split("").includes(letter)) outputMap[0] = letter;
	};
	for(const letter of fives[0].split("")) {
		let valid = true;
		for(const five of fives) {
			if(!five.split("").includes(letter)) valid = false;
		}
		if(valid && digitInputs[4].split("").includes(letter)) outputMap[3] = letter;
		else if(valid && !digitInputs[4].split("").includes(letter) && outputMap[0] != letter) outputMap[6] = letter;
		
	};
	for(const letter of sixes) {
		const chars = letter.split("");
		const splitOne = digitInputs[1].split("");
		let missingLetter = "";
		for(const letter of allLetters) {
			if(!chars.includes(letter)) {
				missingLetter = letter;
				break;
			};
		};
		if(chars.includes(splitOne[0]) && chars.includes(splitOne[1]) && chars.includes(outputMap[3])) { //9 - missing letter is at position 4
			outputMap[4] = missingLetter;
		} else if(chars.includes(outputMap[3])) { //6 - missing letter is at position 2
			outputMap[2] = missingLetter;
		};
	};
	let three = ""
	for(const letter of fives) {
		const split = letter.split("");
		if(
			split.includes(outputMap[0]) &&
			split.includes(outputMap[2]) &&
			split.includes(outputMap[3]) &&
			split.includes(outputMap[6]) &&
			!split.includes(outputMap[4])
		) three = letter;
	};
	outputMap[5] = three.split("").filter(char => ![
		outputMap[0],
		outputMap[2],
		outputMap[3],
		outputMap[6]
	].includes(char))[0];
	outputMap[1] = allLetters.filter(letter => !Object.values(outputMap).includes(letter))[0];
	for(const position in outputMap) {
		outputMap[outputMap[position]] = parseInt(position);
	};
	let numberStr = "";
	const digitsSingle = digits[i];
	for(const letters of digitsSingle) {
		const numCode = [];
		for(const letter of letters) {
			numCode.push(outputMap[letter]);
		};
		numberStr += digitsOutputs.indexOf(numCode.sort((a, b) => a-b).join("")).toString();
	};
	result += parseInt(numberStr);
	i += 1;
};
saveOutput(result.toString());
