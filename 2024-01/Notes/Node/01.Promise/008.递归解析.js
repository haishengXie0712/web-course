import Promise from "./promise-5.js";

const promise2 = new Promise((resolve, reject) => {
  resolve("ok");
}).then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        })
      );
    }, 1000);
  });
});
promise2.then(
  (val) => {
    console.log("成功", val);
  },
  (err) => {
    console.log("失败", err);
  }
);

