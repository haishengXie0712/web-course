const fs = require("fs");
const path = require("path");
// const Promise = require("./promise.js");
//#region 延迟对象
function readFile(url) {
  const dfd = Promise.deferred();
  fs.readFile(url, "utf8", function (err, data) {
    if (err) {
      return dfd.reject(err);
    }
    dfd.resolve(data);
  });
  return dfd.promise;
}

// readFile(path.join(__dirname, "./001-002.高阶函数.js")).then((data) => {
//   console.log(data);
// });
//#endregion

const promise1s = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

Promise.resolve(promise1s).then((data) => {
  console.log(data);
});

