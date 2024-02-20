// promisify实现
// 1. 传入一个函数，返回一个函数
// 2. 返回的函数返回一个promise
// 3. 如果传入的函数执行出错，promise就会失败
// 4. 如果传入的函数执行成功，promise就会成功
// 5. 如果传入的函数执行出错，promise就会失败，并且失败的原因是传入函数执行的结果
// 6. 如果传入的函数执行成功，promise就会成功，并且成功的结果是传入函数执行的结果
const fs = require("fs");
const path = require("path");

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
}

const readFile = promisify(fs.readFile);
readFile(path.join(__dirname, "./promise.js"), "utf8").then((data) => {
  console.log(data);
});

