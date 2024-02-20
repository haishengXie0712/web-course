// Promise 在解决异步编程问题(嵌套的方式) 采用了链式调用来解决的(回调)
// 复杂的业务逻辑还是有嵌套问题

// es6 生成器, 让一步变成变得更像同步
// generator 函数是有暂停功能, 可以按照自己的需要继续执行

function* read() {
    const r1 = yield 1;
    console.log(`r1: ${ r1 }`);
    const r2 = yield 2;
    console.log(`r2: ${ r2 }`);
    const r3 = yield 3;
    console.log(`r3: ${ r3 }`);
    return 4;
}

// const it = read();
// console.log(it.next('call1')); // { value: 1, done: false }, 第一次传参没用
// console.log(it.next('call2')); // { value: 2, done: false }
// console.log(it.next('call3')); // { value: 3, done: false }
// console.log(it.next('call4')); // { value: undefined, done: true }

// yield 是有返回值的, 每次调用 next 方法的时候, 会给上一次 yield 赋值

// 元编程: Symbol 里面的 11 种方法
const likeArray = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function* () {
        let index = 0;
        while (index !== this.length) {
            yield this[index++];
        }
    }
};
const newArray1= [...likeArray]
console.log(newArray1);
