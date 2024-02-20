// 函数式编程核心是组合(把函数变成一个个小函数, 然后组合起来)

// 柯里化转化技术, 将多参数函数转化成单参数函数
function isType(typing) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${ typing }]`;
    };
}
const isString = isType('String');
console.log(isString('123'));
console.log(isString(123));

// 实现通用的柯里化函数
function curring(fn) {
    const inner = (args = []) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...userArgs) => inner([...args, ...userArgs]);
    };
    return inner();
}
function sum(a, b, c, d) {
    return a + b + c + d;
}
const curringSum = curring(sum);
console.log(curringSum(1)(2)(3)(4));
const isString1 = curring(isType)('String');
console.log(isString1('123'));
