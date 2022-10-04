import {VectorOpts} from "./interfaces";
import {isSetBit, resetBit, setBit} from "./BitHelpers";

export class BitVector {
    private values: Array<number> = [];
    private curIdx: number = 0;
    private readonly countBits: number;

    constructor(opts: VectorOpts = {}) {
        this.countBits = opts.countBits ?? 32;
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