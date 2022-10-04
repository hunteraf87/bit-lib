/** Устанавливает бит в 1 по индексу в числе */
export function setBit(num: number, idx: number): number {
    return num | (1 << idx);
}

/** Сбрасывает (устанавливает в 0) значение бита по индексу в числе */
export function resetBit(num: number, idx: number): number {
    return num & ~(1 << idx);
}

/** Проверяет установлен ли бит в 1 по индексу в числе */
export function isSetBit(num: number, idx: number): boolean {
    return (num & (1 << idx)) !== 0;
}

/** Переводит значение бита в противоположное значение по индексу в числе */
export function reverseBit(num: number, idx: number): number {
    return num ^ (1 << idx);
}