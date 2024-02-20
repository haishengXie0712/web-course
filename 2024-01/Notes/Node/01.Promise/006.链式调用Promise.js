import Promise from "./promise-3.js";
new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve(1);
  // }, 100);
  resolve(1);
})
  .then(
    (data) => {
      console.log("层级1成功", data);
      return data + '层级1';
    },
    (reason) => {
      console.log("层级1失败", reason);
    }
  )
  .then(
    (data) => {
      console.log("层级2成功", data);
      throw new Error("层级2失败");
    },
    (reason) => {
      console.log("层级2失败", reason);
    }
  )
  .then(
    (data) => {
      console.log("层级3成功", data);
      return data + '层级3';
    },
    (err) => {
      console.log("层级3失败", err);
      return 1;
    }
  )
  .then(
    (data) => {
      console.log("层级4成功", data);
      return data + '层级4';
    },
    (err) => {
      console.log("层级4失败", err);
    }
  );

