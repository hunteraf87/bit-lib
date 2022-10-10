"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitMaskMix_1 = __importDefault(require("./BitMaskMix"));
class BitScope {
    constructor(arrayOrAlias = []) {
        this._masks = new Map();
        this._freeMasks = new Uint32Array(31);
        this._idxMask = 0;
        this.fillFreeMasks();
        this.add(arrayOrAlias);
    }
    add(arrayOrAlias = []) {
        if (Array.isArray(arrayOrAlias)) {
            this.addAliases(arrayOrAlias);
        }
        else {
            this.addAlias(arrayOrAlias);
        }
    }
    delete(arrayOrAlias = []) {
        if (Array.isArray(arrayOrAlias)) {
            this.deleteAliases(arrayOrAlias);
        }
        else {
            this.deleteAlias(arrayOrAlias);
        }
    }
    mix(...args) {
        let res = 0;
        args.forEach(item => {
            const mask = item instanceof BitMaskMix_1.default ? item.valueOf() : this._masks.get(item);
            if (mask !== undefined) {
                res |= mask;
            }
        });
        return new BitMaskMix_1.default(res, this);
    }
    get masks() {
        return this._masks;
    }
    addAliases(aliases = []) {
        aliases.forEach((alias) => this.addAlias(alias));
    }
    deleteAliases(aliases = []) {
        aliases.forEach((alias) => this.deleteAlias(alias));
    }
    addAlias(alias) {
        if (!this._masks.has(alias)) {
            const mask = this._freeMasks[this._idxMask];
            if (mask !== undefined) {
                this._masks.set(alias, mask);
                this._idxMask--;
            }
        }
    }
    deleteAlias(alias) {
        const mask = this._masks.get(alias);
        if (mask !== undefined) {
            this._freeMasks[++this._idxMask] = mask;
            this._masks.delete(alias);
        }
    }
    fillFreeMasks() {
        for (let i = 30; i >= 0; i--) {
            this._freeMasks[this._idxMask++] = 1 << i;
        }
        this._idxMask--;
    }
}
exports.default = BitScope;
