# Библиотека для работы с битовыми структурами данных

## Битовый вектор

При создании вектора можно указать количество бит для чисел
````js
// const vector = new BitVector({ countBits: 8 });
const vector = new BitVector(); // по умолчанию 32 бита
````

Добавление нового бита со значением в вектор
````js
vector.push(true); 
vector.push(false);
vector.push(false);
vector.push(true);
````

Устанавливает значение бита по индексу
````js
vector.set(15, true)
````
    
Вывод в консоль значений вектора в двоичном формате
````js
vector.print(); // 1000000000001001 
````

Получение значения бита вектора по индексу
````js
console.log(vector.get(3)) // true
console.log(vector.get(10)) // false
````

Длина вектора
````js
console.log(vector.length) // 16
````

Извлекает последнее значение вектора и возвращает его
````js
console.log(vector.pop()); // true
console.log(vector.length) // 15
````

Возвращает ArrayBuffer
````js
console.log(vector.buffer) // bits array <09 00 00 00>
````

Очистка вектора
````js
vector.clear();
````

## Битовые карты и маски

Инициализация карты со значениями по умолчанию
````js
const permissions = new BitScope(['read', 'write', 'delete']);
// const permissions = new BitScope(); // без значений
````

Добавление в карту новых значений. Возможно добавление следующих типов string | number | boolean | object.
Возможно добавление массива значений.
````js
permissions.add('test');
permissions.add(['test2']);
````

Удаление значений из карту
````js
permissions.delete('test2');
// permissions.delete(['test2']);  // Удаление нескольних значений
````

Текущая битовая карта
````js
console.log(permissions.masks) // Map(4) { 'read' => 1, 'write' => 2, 'delete' => 4, 'test' => 8 }
````

Объединение масок в группы
Возможно объединение как самих масок так и имеющихся групп масок
````js
const roleGuest = permissions.mix('read')
const roleAdmin = permissions.mix(roleGuest, 'write', 'delete')
````

### Проверка доступности масок для конкретной группы
Проверка доступности хотя бы одного значения из списка
````js
console.log(roleGuest.can('read', 'test')) // true
````

Проверка доступности всех значений из списка
````js
console.log(roleAdmin.canAll('read', 'write')) // true
console.log(roleGuest.canAll('read', 'test')) // false
````

## Вспомогательные фунции для работы с битами в числах
Установка бита в 1 по индексу в числе
````js
let num = 0;
num = setBit(num, 3);
console.log(num.toString(2)) // 1000
````

Проверка значения бита по индексу в числе
````js
console.log(isSetBit(num, 3)) // true
console.log(isSetBit(num, 2)) // false

num = setBit(num, 5);
console.log(num.toString(2)) // 101000
````

Сбрасывает значение бита в 0 по индексу в числе
````js
num = resetBit(num, 3);
console.log(num.toString(2)) // 100000
````

Изменяет значение бита на противоположное по индексу в числе
````js
num = reverseBit(num, 3);
console.log(num.toString(2)) // 101000
````
