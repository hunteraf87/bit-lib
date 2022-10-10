import {ScopeKey, BitMaskMix as Mix} from "./interfaces";
import BitScope from "./BitScope";

export default class BitMaskMix extends Number implements Mix {
    private _scope: BitScope;

    constructor(number: number, scope: BitScope) {
        super(number);
        this._scope = scope;
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