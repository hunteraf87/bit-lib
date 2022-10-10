import assert from 'assert';
import { BitVector } from '../src';

const filledVector = () => {
    const vector = new BitVector();
    vector.push(true);
    vector.push(false);
    vector.push(false);
    vector.push(true);
    return vector;
}

describe("BitVector", function () {

    it("Создание вектора без параметров", function () {
        assert.strictEqual(new BitVector() instanceof BitVector, true);
    });

    it("Создание вектора с параметрами", function () {
        const vector = new BitVector({ countBits: 8 });
        assert.strictEqual(vector instanceof BitVector, true);
    });

    it("Заполнение вектора и получение значения", function () {
        const vector = filledVector();
        assert.strictEqual(vector.length, 4);
        assert.strictEqual(vector.get(2), false);
    });

    it("Извлечение последнего значения", function () {
        const vector = filledVector();
        assert.strictEqual(vector.pop(), true);
        assert.strictEqual(vector.length, 3);
    });

    it("Очистка", function () {
        const vector = filledVector();
        vector.clear();
        assert.strictEqual(vector.length, 0);
    });
});
