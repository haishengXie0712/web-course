import Promise from "./promise-2.js";

console.log(2);
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve("resolve");
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
console.log(3);

