// 什么是Promise, 解决了那些问题? Promise 目的就是更优雅, 让异步代码更容易维护
// 1. 回调地狱
// 2. 错误处理
// 3. 并发问题

console.log(2);
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve("resolve");
    //   reject("reject");
    //   throw new Error("error");
  }, 1000);
});
promise.then(
  (value) => {
    console.log("成功1", value);
  },
  (reason) => {
    console.log("失败1", reason);
  }
);
promise.then(
  (value) => {
    console.log("成功2", value);
  },
  (reason) => {
    console.log("失败2", reason);
  }
);
console.log(3);
