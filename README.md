# Библиотека для работы с битовыми структурами данных

## Битовый вектор

Использование

    // Подключение    
    const { BitVector } = require("./dist");

    // При создании вектора можно указать количество бит для чисел
    // const vector = new BitVector({ countBits: 8 });
    const vector = new BitVector(); // по умолчанию 32 бита

    // Добавляет новый бит со значением в вектор
    vector.push(true); 
    vector.push(false);
    vector.push(false);
    vector.push(true);
    
    vector.set(15, true) // Устанавливает значение бита по индексу
    
    // вывод в консоль чисел вектора в двоичном формате
    vector.print(); // 1000000000001001 
    
    // получение значения бита вектора по индексу
    console.log(vector.get(3)) // true
    console.log(vector.get(10)) // false
    
    // длина вектора
    console.log(vector.length) // 16
    
    // извлекает последнее значение вектора и возвращает его
    console.log(vector.pop()); // true
    
    console.log(vector.length) // 15
    
    // Возвращает ArrayBuffer
    console.log(vector.buffer) // bits array <09 00 00 00>
    
    // Очистка вектора
    vector.clear();

## Битовые карты и маски
Использование

    // Подключение
    const { BitScope } = require("./dist");
    
    // Инициализация карты со значениями по умолчанию
    const permissions = new BitScope(['read', 'write', 'delete']);
    // const permissions = new BitScope(); // без значений
    
    // Добавление в карту новых значений
    // возможно добавление следующих типов string | number | boolean | object
    permissions.add('test');
    permissions.add(['test2']);
    
    // Удаление значений из карту
    permissions.delete('test2');
    // permissions.delete(['test2']);
    
    // Текущая битовая карта
    console.log(permissions.masks) // Map(4) { 'read' => 1, 'write' => 2, 'delete' => 4, 'test' => 8 }
    
    // Объединение масок в группы
    // Возможно объединение как самих масок так и имеющихся групп масок
    const roleGuest = permissions.mix('read')
    const roleAdmin = permissions.mix(roleGuest, 'write', 'delete')
    
    // Проверка доступности масок для конкретной группы
    // Проверка доступности хотя бы одной из списка
    console.log(roleGuest.can('read', 'test')) // true

    // Проверка доступности всех масок из списка
    console.log(roleAdmin.canAll('read', 'write')) // true
    console.log(roleGuest.canAll('read', 'test')) // false


## Вспомогательные фунции для работы с битами в числах
Использование

    // Подключение
    const { isSetBit, setBit, resetBit, reverseBit } = require("./dist");
    
    let num = 0;
    // Устанавливает бит в 1 по индексу в числе
    num = setBit(num, 3);
    
    console.log(num.toString(2)) // 1000
    
    // Проверка значения бита по индексу в числе
    console.log(isSetBit(num, 3)) // true
    console.log(isSetBit(num, 2)) // false
    
    num = setBit(num, 5);
    console.log(num.toString(2)) // 101000
    
    // Сбрасывает значение бита в 0 по индексу в числе
    num = resetBit(num, 3);
    console.log(num.toString(2)) // 100000
    
    // Изменяет значение бита на противоположное по индексу в числе
    num = reverseBit(num, 3);
    console.log(num.toString(2)) // 101000
