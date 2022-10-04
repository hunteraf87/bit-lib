"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitMaskMix = void 0;
class BitMaskMix extends Number {
    constructor(number, _scope) {
        super(number);
        this._scope = _scope;
    }
    can(...args) {
        const verify = this._scope.mix(...args);
        return Boolean(this.valueOf() & verify.valueOf());
    }
    canAll(...args) {
        const verify = this._scope.mix(...args).valueOf();
        return (this.valueOf() & verify) === verify;
    }
}
exports.BitMaskMix = BitMaskMix;
