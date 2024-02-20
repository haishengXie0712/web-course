import Promise from "./promise-4.js";

const promise2 = new Promise((resolve, reject) => {
  resolve("ok");
}).then((data) => {
  return 123
});
promise2.then(
  (val) => {
    console.log("成功", val);
  },
  (err) => {
    console.log("失败", err);
  }
);

