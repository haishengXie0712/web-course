// 高阶函数: 组合(拓展) + 缓存
// 一个函数参数是函数, 或者一个函数返回值是函数, 那么这个函数就是高阶函数

Array.prototype.myReduce = function (fn, init) {
    let arr = this;
    let base = typeof init === 'undefined' ? arr[0] : init;
    let startPoint = typeof init === 'undefined' ? 1 : 0;
    arr.slice(startPoint).forEach((item, index) => {
        base = fn(base, item, index + startPoint, arr);
    });
    return base;
};
// const total = [1, 2, 3, 4, 5, 6].myReduce((memo, prev) => memo + prev, 0);
// console.log(total);

// 什么是闭包?
// 函数可以记住当前所在的词法作用域(声明的时候), 然后在当前词法作用域外执行, 就产生了闭包

// 函数缓存
function sum(a, b) {
    console.log('sum');
    return a + b;
}

// const lodash = require('lodash');
// const memo = lodash.memoize(sum, (...args) => {
//     return JSON.stringify(args);
// });

function memoize(coreFn, resolver) {
    const cache = new Map();
    return function (...args) {
        const key = resolver ? resolver(...args) : args[0];
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = coreFn(...args);
        cache.set(key, result);
        return result;
    };
}

const memo = memoize(sum, (...args) => {
    return JSON.stringify(args);
});
console.log(memo(1, 2));
console.log(memo(1, 2));
console.log(memo(1, 3));
