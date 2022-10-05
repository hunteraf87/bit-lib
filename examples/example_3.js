const { isSetBit, setBit, resetBit, reverseBit } = require("./dist");

let num = 0;
num = setBit(num, 3);

console.log(num.toString(2)) // 1000

console.log(isSetBit(num, 3)) // true
console.log(isSetBit(num, 2)) // false

num = setBit(num, 5);
console.log(num.toString(2)) // 101000

num = resetBit(num, 3);
console.log(num.toString(2)) // 100000

num = reverseBit(num, 3);
console.log(num.toString(2)) // 101000
