"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BitMaskMix extends Number {
    constructor(number, scope) {
        super(number);
        this._scope = scope;
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
exports.default = BitMaskMix;
