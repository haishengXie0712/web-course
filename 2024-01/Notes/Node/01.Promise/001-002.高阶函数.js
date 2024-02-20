/**
 * 什么是高阶函数: 满足一下两个条件之一的函数
 * 1. 如果一个函数的参数是一个函数(回调函数)
 * 2. 如果一个函数返回一个函数(高阶函数)
 * 高阶函数是函数式编程非常重要的核心概念
 */

import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // 异步并发问题
// function after(times, cb) {
//   const result = {};
//   return (key, value) => {
//     result[key] = value;
//     if (--times === 0) {
//       cb(result);
//     }
//   };
// }

// const cb = after(2, (data) => {
//   console.log(data);
// });

// fs.readFile(resolve(__dirname, "./name.txt"), "utf-8", (err, data) => {
//   cb("name", data);
// });
// fs.readFile(resolve(__dirname, "./age.txt"), "utf-8", (err, data) => {
//   cb("age", data);
// });

/**
 * 发布订阅模式
 */
const events = {
  on(event, cb) {
    if (this[event]) {
      this[event].push(cb);
    } else {
      this[event] = [cb];
    }
  },
  emit(event, data) {
    if (this[event]) {
      this[event].forEach((cb) => cb(data));
    }
  },
};
events.on("name", (data) => {
  console.log("name", data);
});
events.on("age", (data) => {
  console.log("age", data);
});
fs.readFile(resolve(__dirname, "./testing/name.txt"), "utf-8", (err, data) => {
  events.emit("name", data);
});
fs.readFile(resolve(__dirname, "./testing/age.txt"), "utf-8", (err, data) => {
  events.emit("age", data);
});

