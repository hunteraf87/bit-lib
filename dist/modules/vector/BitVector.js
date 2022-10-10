"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class BitVector {
    constructor(opts = {}) {
        this.values = [];
        this.curIdx = 0;
        this.countBits = 32;
        if (opts.countBits) {
            if ([8, 16, 32].findIndex(i => i === opts.countBits) === -1) {
                throw new Error('Incorrect bits value.');
            }
            this.countBits = opts.countBits;
        }
    }
    push(val) {
        if (!this.haveRow(this.curIdx)) {
            this.values.push(0);
        }
        if (val) {
            this.values[this.getCurRow()] = (0, helpers_1.setBit)(this.values[this.getCurRow()], this.getCurCol());
        }
        this.curIdx++;
    }
    set(idx, val) {
        if (!this.haveRow(idx)) {
            this.expand(this.getRow(idx));
        }
        this.curIdx = this.curIdx <= idx ? idx + 1 : this.curIdx;
        this.values[this.getRow(idx)] = val ?
            (0, helpers_1.setBit)(this.values[this.getRow(idx)], this.getCol(idx))
            : (0, helpers_1.resetBit)(this.values[this.getRow(idx)], this.getCol(idx));
    }
    pop() {
        this.curIdx--;
        const val = (0, helpers_1.isSetBit)(this.values[this.getCurRow()], this.getCurCol());
        this.values[this.getCurRow()] = (0, helpers_1.resetBit)(this.values[this.getCurRow()], this.getCurCol());
        return val;
    }
    get(idx) {
        if (!this.haveRow(idx)) {
            return undefined;
        }
        return (0, helpers_1.isSetBit)(this.values[this.getRow(idx)], this.getCol(idx));
    }
    clear() {
        this.values = [];
        this.curIdx = 0;
    }
    print() {
        this.values.forEach(i => console.log(i.toString(2)));
    }
    get buffer() {
        switch (this.countBits) {
            case 8:
                return new Uint8Array(this.values).buffer;
            case 16:
                return new Uint16Array(this.values).buffer;
            default:
                return new Uint32Array(this.values).buffer;
        }
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
exports.default = BitVector;
