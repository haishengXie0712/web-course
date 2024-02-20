// 什么是函数式编程
// 用函数来组合以及处理数据, 讲运算过程抽象成函数, 从而达到简洁的目的

// PP面向过程
// oop面向对象

// fp函数式编程:
// 1. 不关心运算过程, 只关心运算结果;
// 2. 数学意义上 y = f(x) ;
// 3. 可以让多个函数组合起来使用, 组合高于集成
const arr = [1, 2, 3];
const sum = arr.reduce((prev, curr, currIndex, arr) => prev + curr, 0);
console.log(sum);

