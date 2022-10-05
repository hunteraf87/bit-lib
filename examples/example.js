const { BitVector } = require("./dist");

// const vector = new BitVector({ countBits: 8 });
const vector = new BitVector();

vector.push(true);
vector.push(false);
vector.push(false);
vector.push(true);

vector.set(15, true)

vector.print(); // 1000000000001001

console.log(vector.get(3)) // true
console.log(vector.get(10)) // false

console.log(vector.length) // 16

console.log(vector.pop()); // true

console.log(vector.length) // 15

console.log(vector.buffer) // bits array <09 00 00 00>

vector.clear();



