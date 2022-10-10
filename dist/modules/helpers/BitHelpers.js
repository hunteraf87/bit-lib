"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseBit = exports.isSetBit = exports.resetBit = exports.setBit = void 0;
function setBit(num, idx) {
    return num | (1 << idx);
}
exports.setBit = setBit;
function resetBit(num, idx) {
    return num & ~(1 << idx);
}
exports.resetBit = resetBit;
function isSetBit(num, idx) {
    return (num & (1 << idx)) !== 0;
}
exports.isSetBit = isSetBit;
function reverseBit(num, idx) {
    return num ^ (1 << idx);
}
exports.reverseBit = reverseBit;
