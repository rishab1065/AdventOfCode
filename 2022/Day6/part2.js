let input = require('./input');

let sampleInput = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
// input = sampleInput;

input = input.split('');

let marker = [];

for (var i = 0; i < input.length; i++) {
  const signal = input[i];
  if (!marker.includes(signal)) {
    marker.push(signal);
  } else {
    const index = marker.indexOf(signal);
    marker = marker.slice(index + 1);
    marker.push(signal);
  }
  console.log(marker, 'marker');

  if (marker.length === 14) {
    console.log(i + 1, 'start');
    break;
  }
}
