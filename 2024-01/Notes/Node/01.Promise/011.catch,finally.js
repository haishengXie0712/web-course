/**
 * catch,finally
 * 1. catch 是 then 的一个别名, 没有成功只有失败
 * 2. finally 是无论如何都会执行的
 */
const Promise = require("./promise.js");
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 100);
})
  .finally(() => {
    console.log("resolve finally");
    return Promise.reject("111");
  })
  .then((data) => {
    console.log("p1 success", data);
  })
  .catch((err) => {
    console.log("p1 err", err);
  });

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p2");
  }, 200);
})
  .finally(() => {
    console.log("reject finally");
    return Promise.reject("111");
  })
  .then((data) => {
    console.log("p2 success", data);
  })
  .catch((err) => {
    console.log("p2 err", err);
  });

