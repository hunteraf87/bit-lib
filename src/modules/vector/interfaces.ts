export interface VectorOpts {
    countBits?: 8 | 16 | 32
}

export interface BitVector {
    get buffer(): ArrayBuffer;
    get length(): number;

    push(val: boolean): void;
    set(idx: number, val: boolean): void;
    pop(): boolean;
    get(idx: number): boolean | undefined;
    clear(): void;
    print(): void;
}