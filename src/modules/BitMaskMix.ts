import {ScopeKey} from "./interfaces";
import {BitScope} from "./BitScope";

export class BitMaskMix extends Number {

    constructor(number: number, private _scope: BitScope) {
        super(number);
    }

    can(...args: Array<ScopeKey>): boolean {
        const verify = this._scope.mix(...args);
        return Boolean(this.valueOf() & verify.valueOf());
    }

    canAll(...args: Array<ScopeKey>): boolean {
        const verify = this._scope.mix(...args).valueOf();
        return (this.valueOf() & verify) === verify;
    }
}