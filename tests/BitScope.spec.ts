import assert from 'assert';
import { BitScope } from '../src';

const filledScope = () => {
    return new BitScope(['read', 'write', 'delete']);
}

describe("BitScope", function () {

    it("Создание", function () {
        assert.strictEqual(new BitScope([]) instanceof BitScope, true);
    });

    it("Создание с параметрами", function () {
        const scope = filledScope();
        assert.strictEqual(scope instanceof BitScope, true);
    });

    it("Заполнение и получение значения", function () {
        const scope = filledScope();
        scope.add('test');
        scope.add(['test2']);
        assert.strictEqual(Boolean(scope.masks.get('test')), true);
        assert.strictEqual(Boolean(scope.masks.get('test2')), true);
    });

    it("Удаление значения", function () {
        const scope = filledScope();
        scope.add('test');
        scope.delete('test');
        assert.strictEqual(Boolean(scope.masks.get('test')), false);
        scope.add('test2');
        assert.strictEqual(scope.masks.get('test2'), 8);
    });

    it("Проверка масок", function () {
        const scope = filledScope();
        const mix = scope.mix('read', 'write');
        assert.strictEqual(mix.can('read'), true);
        assert.strictEqual(mix.can('read', 'write'), true);
        assert.strictEqual(mix.can('delete'), false);
        assert.strictEqual(mix.canAll('read','delete'), false);
    });

});
