// 组合
function double(x) {
    return x * 2;
}

function toFixed(x) {
    return x.toFixed(2);
}

function addPrefix(x) {
    return '$' + x;
}

// 从右到左执行
function flowRight(...args) {
    return function (value) {
        return args.reverse().reduce(function (acc, fn) {
            return fn(acc);
        }, value);
    }
}
const composeFn = flowRight(addPrefix, toFixed, double);
console.log(composeFn(100)); // $200.00
