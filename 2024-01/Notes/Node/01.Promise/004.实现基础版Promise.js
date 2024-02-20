/**
 * Promise的基础版本
 * 1. Promise States 有三个状态, 变换之后不得转换到任何其他状态
 *  1.1. pending 等待
 *  1.2. fulfilled 成功
 *  1.3. rejected 失败
 * 2. 每个 Promise 实例都有一个 then 方法, 可以接受两个参数(成功, 失败)
 * 3. 每个 Promise 在创建的时候都需要传入一个 executor 函数, 该函数会立即执行
 * 4. pending等待状态时, 可以转换到 fulfilled 成功状态或者 rejected 失败状态
 */

import Promise from "./promise-1.js";

console.log(2);
const promise = new Promise((resolve, reject) => {
  console.log(1);
  reject("resolve");
});
promise.then(
  (value) => {
    console.log("成功", value);
  },
  (reason) => {
    console.log("失败", reason);
  }
);
console.log(3);
