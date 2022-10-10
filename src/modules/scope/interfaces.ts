export type ScopeKey = string
    | number
    | boolean
    | object

export interface BitScope {
    add(alias: ScopeKey): void;
    add(aliases: Array<ScopeKey>): void;

    delete(alias: ScopeKey): void;
    delete(aliases: Array<ScopeKey>): void;

    mix(...args: Array<ScopeKey | BitMaskMix>): BitMaskMix;
}

export interface BitMaskMix {
    can(...args: Array<ScopeKey>): boolean;
    canAll(...args: Array<ScopeKey>): boolean;
}