"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitVector = void 0;
const BitHelpers_1 = require("./BitHelpers");
class BitVector {
    constructor(opts = {}) {
        var _a;
        this.values = [];
        this.curIdx = 0;
        this.countBits = (_a = opts.countBits) !== null && _a !== void 0 ? _a : 32;
    }
    push(val) {
        if (!this.haveRow(this.curIdx)) {
            this.values.push(0);
        }
        if (val) {
            this.values[this.getCurRow()] = (0, BitHelpers_1.setBit)(this.values[this.getCurRow()], this.getCurCol());
        }
        this.curIdx++;
    }
    set(idx, val) {
        if (!this.haveRow(idx)) {
            this.expand(this.getRow(idx));
        }
        this.curIdx = this.curIdx <= idx ? idx + 1 : this.curIdx;
        this.values[this.getRow(idx)] = val ?
            (0, BitHelpers_1.setBit)(this.values[this.getRow(idx)], this.getCol(idx))
            : (0, BitHelpers_1.resetBit)(this.values[this.getRow(idx)], this.getCol(idx));
    }
    pop() {
        this.curIdx--;
        const val = (0, BitHelpers_1.isSetBit)(this.values[this.getCurRow()], this.getCurCol());
        this.values[this.getCurRow()] = (0, BitHelpers_1.resetBit)(this.values[this.getCurRow()], this.getCurCol());
        return val;
    }
    get(idx) {
        if (!this.haveRow(idx)) {
            return undefined;
        }
        return (0, BitHelpers_1.isSetBit)(this.values[this.getRow(idx)], this.getCol(idx));
    }
    clear() {
        this.values = [];
        this.curIdx = 0;
    }
    print() {
        console.log('-----Print vector-----');
        this.values.forEach(i => console.log(i.toString(2)));
    }
    get length() {
        return this.curIdx;
    }
    getRow(idx) {
        return idx / this.countBits ^ 0;
    }
    getCol(idx) {
        return idx % this.countBits;
    }
    getCurRow() {
        return this.getRow(this.curIdx);
    }
    getCurCol() {
        return this.getCol(this.curIdx);
    }
    haveRow(idx) {
        return typeof this.values[this.getRow(idx)] !== 'undefined';
    }
    expand(count) {
        let length = this.values.length;
        while (length < count) {
            this.values.push(0);
            length++;
        }
    }
}
exports.BitVector = BitVector;
