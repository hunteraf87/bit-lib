import {ScopeKey, BitScope as Scope} from "./interfaces";
import BitMaskMix from "./BitMaskMix";

export default class BitScope implements Scope {
    private _masks: Map<ScopeKey, number> = new Map();
    private _freeMasks: Uint32Array = new Uint32Array(31);
    private _idxMask: number = 0;

    constructor(alias: ScopeKey);
    constructor(aliases: Array<ScopeKey>);
    constructor(arrayOrAlias: Array<ScopeKey> | ScopeKey = []) {
        this.fillFreeMasks();
        this.add(arrayOrAlias);
    }

    add(alias: ScopeKey): void;
    add(aliases: Array<ScopeKey>): void;
    add(arrayOrAlias: Array<ScopeKey> | ScopeKey = []): void {
        if (Array.isArray(arrayOrAlias)) {
            this.addAliases(arrayOrAlias);
        } else {
            this.addAlias(arrayOrAlias);
        }
    }

    delete(alias: ScopeKey): void;
    delete(aliases: Array<ScopeKey>): void;
    delete(arrayOrAlias: Array<ScopeKey> | ScopeKey = []): void {
        if (Array.isArray(arrayOrAlias)) {
            this.deleteAliases(arrayOrAlias);
        } else {
            this.deleteAlias(arrayOrAlias);
        }
    }

    mix(...args: Array<ScopeKey | BitMaskMix>): BitMaskMix {
        let res = 0;
        args.forEach(item => {
            const mask = item instanceof BitMaskMix ? item.valueOf() : this._masks.get(item);
            if (mask !== undefined) {
                res |= mask;
            }
        })
        return new BitMaskMix(res, this);
    }

    get masks(): Map<ScopeKey, number> {
        return this._masks;
    }

    private addAliases(aliases: Array<ScopeKey> = []): void {
        aliases.forEach((alias) => this.addAlias(alias));
    }

    private deleteAliases(aliases: Array<ScopeKey> = []): void {
        aliases.forEach((alias) => this.deleteAlias(alias));
    }

    private addAlias(alias: ScopeKey): void {
        if (!this._masks.has(alias)) {
            const mask = this._freeMasks[this._idxMask];
            if (mask !== undefined) {
                this._masks.set(alias, mask);
                this._idxMask--;
            }
        }
    }

    private deleteAlias(alias: ScopeKey): void {
        const mask = this._masks.get(alias);
        if (mask !== undefined) {
            this._freeMasks[++this._idxMask] = mask;
            this._masks.delete(alias);
        }
    }

    private fillFreeMasks(): void {
        for(let i = 30; i >= 0; i--) {
            this._freeMasks[this._idxMask++] = 1 << i;
        }
        this._idxMask--;
    }
}
