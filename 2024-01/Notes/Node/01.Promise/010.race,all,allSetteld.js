/**
 * 处理并发: Promise.all Promise.race Promise.allSettled
 * Promise.all: 全部成功才成功, 有一个失败就失败
 * Promise.race: 谁快用谁的结果
 * Promise.allSettled: 不管成功还是失败, 都会执行
 */
const Promise = require("./promise.js");

//#region Promise.race: 使用场景, 如何中断一个Promise
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("p1");
//   }, 1000);
// });
// // 封装一层 abort 可以自定义中断
// function abortPromise(promise) {
//   let abort;
//   let abortPromise = new Promise((resolve, reject) => {
//     abort = reject;
//   });
//   let temp = Promise.race([promise, abortPromise]);
//   temp.abort = abort;
//   return temp;
// }
// const p2 = abortPromise(p1);
// setTimeout(() => p2.abort("超时了"), 500);
// p2.then(
//   (data) => {
//     console.log("success", data);
//   },
//   (err) => {
//     console.log("err", err);
//   }
// );
//#endregion

//#region Promise.all
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("p1");
//   }, 100);
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("p2");
//   }, 200);
// });
// Promise.all([p1, p2, 3]).then(
//   (data) => {
//     console.log("success", data);
//   },
//   (err) => {
//     console.log("fail", err);
//   }
// );
//#endregion

//#region Promise.allSettled
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p1");
  }, 100);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 200);
});
Promise.allSettled([p1, p2, 3]).then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("fail", err);
  }
);
//#endregion
