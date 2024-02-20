import Promise from "./promise-6.js";

let p = new Promise((resolve, reject) => {
  resolve("ok");
});
p.then()
  .then()
  .then()
  .then()
  .then((data) => {
    console.log(data);
  });

