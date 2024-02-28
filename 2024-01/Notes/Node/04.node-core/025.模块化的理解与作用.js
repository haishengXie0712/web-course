/**
 * 为什么开发需要模块化(防止开发的时候,有命名冲突问题)
 * 早期规范: cmd(sea.js), amd(require.js), umd(合集), commonjs(node), es6 module, iife, system.js
 *
 * node 中的 commonjs 规范, 通过这个规范来定义,使用,到处模块
 * 1. 每个JS文件都是一个模块, 每个文件在运行的时候都会产生一个函数, 这个函数有5个参数, exports, require, module, __filename, __dirname
 * 2. 每次使用一个模块可以采用 require 方式来进行导入
 * 3. 如果想让别人使用当前模块, 可以采用 module.exports 方式
 *
 * 在node中模块分成三类
 * 1. 核心模块: fs, http, path, os, events 等
 * 2. 第三方模块: 需要安装的模块, 通过npm来进行安装
 * 3. 自定义模块: 自己写的模块
 * */

// const fs = require('fs');
// const path = require('path');
// const data = fs.readFileSync(path.resolve('../test-file/moduleA.js'), 'utf8')
// console.log(data);
// console.log("环境变量分隔符: ", path.delimiter);

/**
 * 如何执行 JS 字符串
 * 1. eval(JS语言带的) -> eval 是在调用 eval 时的上下文执行
 * 2. new Function(JS语言带的) -> Function 构造函数创建的函数仅在全局作用域中执行
 * 3. vm.runInThisContext(node特有的)
 * */
const vm = require('vm');
vm.runInContext('console.log("hello", a)', vm.createContext({ console, a: 1 }));
