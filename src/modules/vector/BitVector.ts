import {VectorOpts, BitVector as Vector} from "./interfaces";
import {isSetBit, resetBit, setBit} from "../helpers";

export default class BitVector implements Vector {
    private values: Array<number> = [];
    private curIdx: number = 0;
    private readonly countBits: number = 32;

    constructor(opts: VectorOpts = {}) {
        if (opts.countBits) {
            if ([8,16,32].findIndex(i => i === opts.countBits) === -1) {
                throw new Error('Incorrect bits value.')
            }
            this.countBits = opts.countBits;
        }
    }

    push(val: boolean): void {
        if (!this.haveRow(this.curIdx)) {
            this.values.push(0);
        }
        if (val) {
            this.values[this.getCurRow()] = setBit(this.values[this.getCurRow()], this.getCurCol());
        }
        this.curIdx++;
    }

    set(idx: number, val: boolean): void {
        if (!this.haveRow(idx)) {
            this.expand(this.getRow(idx));
        }
        this.curIdx = this.curIdx <= idx ? idx + 1 : this.curIdx;
        this.values[this.getRow(idx)] = val ?
            setBit(this.values[this.getRow(idx)], this.getCol(idx))
            : resetBit(this.values[this.getRow(idx)], this.getCol(idx));
    }

    pop(): boolean {
        this.curIdx--;
        const val = isSetBit(this.values[this.getCurRow()], this.getCurCol());
        this.values[this.getCurRow()] = resetBit(this.values[this.getCurRow()], this.getCurCol());
        return val;
    }

    get(idx: number): boolean | undefined {
        if (!this.haveRow(idx)) {
            return undefined;
        }
        return isSetBit(this.values[this.getRow(idx)], this.getCol(idx));
    }

    clear(): void {
        this.values = [];
        this.curIdx = 0;
    }

    print(): void {
        this.values.forEach(i => console.log(i.toString(2)));
    }

    get buffer(): ArrayBuffer {
        switch (this.countBits) {
            case 8:
                return new Uint8Array(this.values).buffer;
            case 16:
                return new Uint16Array(this.values).buffer;
            default:
                return new Uint32Array(this.values).buffer;
        }
    }

    get length(): number {
        return this.curIdx;
    }

    private getRow(idx: number): number {
        return idx / this.countBits ^ 0;
    }

    private getCol(idx: number): number {
        return idx % this.countBits;
    }

    private getCurRow(): number {
        return this.getRow(this.curIdx);
    }

    private getCurCol(): number {
        return this.getCol(this.curIdx);
    }

    private haveRow(idx: number): boolean {
        return typeof this.values[this.getRow(idx)] !== 'undefined';
    }

    private expand(count: number): void {
        let length = this.values.length;
        while (length < count) {
            this.values.push(0);
            length++;
        }
    }
}