"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitScope = void 0;
const BitMaskMix_1 = require("./BitMaskMix");
class BitScope {
    constructor(arrayOrAlias = []) {
        this._masks = new Map();
        this._freeMasks = new Array(31);
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
            const mask = item instanceof BitMaskMix_1.BitMaskMix ? item.valueOf() : this._masks.get(item);
            if (mask !== undefined) {
                res |= mask;
            }
        });
        return new BitMaskMix_1.BitMaskMix(res, this);
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
            const mask = this._freeMasks.pop();
            if (mask !== undefined) {
                this._masks.set(alias, mask);
            }
        }
    }
    deleteAlias(alias) {
        const mask = this._masks.get(alias);
        if (mask !== undefined) {
            this._freeMasks.push(mask);
            this._masks.delete(alias);
        }
    }
    fillFreeMasks() {
        for (let i = 31; i >= 0; i--) {
            this._freeMasks.push(1 << i);
        }
    }
}
exports.BitScope = BitScope;
