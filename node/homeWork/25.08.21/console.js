/** Пример использования console: */

/** 1 */

// const obj = {
//     name: 'Andrey',
//     city: 'xxx',
//     children: [
//         {name: 'xxx', city: 'xxx'},
//         {name: '2xxx', city: '2xxx'}
//     ]
// };
//
// Object.defineProperty(obj, 'children', {
//     enumerable: false,
//     writable: false,
//     value: 13
// })
//
// console.log(obj)
// console.dir({obj})
// //Во второй аргумент можно писать разрешение видеть скрытие поля
// // глубину вложенности разрешить подсветку разными цветами
// console.dir({obj}, {showHidden: true, depth: 20, colors: true})

/** 2 */

/** Замеряет время если заканчиваеться там */
// console.time('Loop time')
// const arr = [];
//
// for (let i = 0; i < 10000; i++) {
//     arr.push(i)
// }
// console.timeEnd('Loop time')

/** 3 */

/** Делает тоже что и, но при этом программа не останавливаеться, но при этом мы увидем ошибку  */
// console.trace('message');
// throw new Error('message');
// console.log('xxx')

/** 4 */

/** Объяснению не подлежит */
// console.log(Object.keys(console))

/** 5 */

/** удаляет все данные терминала */
// console.clear()

/** 6 */

/** Рисует нам таблицу в консоле */
// const person = [
//     {name: 'Max', surname: 'xxx', age: 20, job: 'frontend developer'},
//     {name: 'Kirill', surname: 'xxx', age: 9e9, job: 'frontend developer'}
// ]

// console.table(person);

/** 7 */

/** Увеличивает отступ последующих строк пробелами по groupIndentation длине */
// console.log("This is the outer level");
// console.group();
// console.log("Level 2");
// console.group();
// console.log("Level 3");
// console.groupEnd();
// console.log("Back to level 2");
// console.groupEnd();
// console.log("Back to the outer level");

/** 8 */

/** если значение правда то тогда нечего не выводиться  */
// console.assert(true, 'does nothing');
//
// console.assert(false, 'Whoops work', 'didn\'t');
// // Assertion failed: Whoops didn't work
//
// console.assert();
// // Assertion failed

/** 9 */

/**
 * Поддерживает специальный внутренний счетчик label и выводит
 * stdout количество console.count() вызовов с заданным числом label.
 */
// console.count()
// console.count('default')
// console.count('abc')
// console.count()

/** Сбрасывает внутренний счетчик, относящийся к label */
// console.countReset('abc');

/** 10 */

/**
 *  Отображает список Описание объекта JavaScript.
 *  Вывод представлен в виде иерархического списка с помощью просмотра дочерних объектов
 */

// console.dir()

/** 11 */

/** Выводит сообщение об ошибке в веб-консоль */
// console.error('Error: I didn\'t like the way you look at me')

/** 12 */

/** Функция является псевдонимом console.log()*/
// console.info(123)
// console.log(123)

/** 13 */

/** Для таймера, который ранее был запущен вызовом console.time(), выводит прошедшее время */
// console.time('process');
// console.timeLog('process');
// console.timeEnd('process');

/** 14 */

/** Выводит стэк трэйс в Веб Консоль */
// console.trace('Show me');

/** 15 */
/** 16 */
/** 17 */
