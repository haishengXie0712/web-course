const path = require("node:path");
const fs = require("node:fs");
const vm = require("node:vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}
Module.extensions = {
  ".js"(module) {
    const script = fs.readFileSync(module.id, "utf8");
    const fnStr = `(function(exports, require, module, __filename, __dirname){${script}})`;
    const fn = vm.runInThisContext(fnStr);
    Reflect.apply(fn, module.exports, [module.exports, myRequire, module, module.id, path.dirname(module.id)]);
  },
  ".json"(module) {
    const script = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(script);
  },
};
Module.prototype.load = function () {
  const ext = path.extname(this.id);
  Module.extensions[ext](this);
};
Module._resolveFilename = function (id) {
  // 自带后缀
  const fileUrl = path.resolve(__dirname, id);
  if (fs.existsSync(fileUrl)) {
    return fileUrl;
  }
  // 拼接默认后缀
  const exts = Reflect.ownKeys(Module.extensions);
  for (let i = 0; i < exts.length; i++) {
    const fileUrl = path.resolve(__dirname, id + exts[i]);
    if (fs.existsSync(fileUrl)) {
      return fileUrl;
    }
  }
  // 找不到文件
  throw new Error("module not found");
};

function myRequire(path) {
  // 1. 解析文件路径
  const filePath = Module._resolveFilename(path);
  // 2. 创建模块
  const module = new Module(filePath);
  // 3. 加载模块 = 读取文件 + 包裹函数 + 执行
  module.load();
  // 4. 返回模块的exports
  return module.exports;
}
const moduleAJs = myRequire("../test-file/moduleA");
const moduleAJson = myRequire("../test-file/moduleA.json");
console.log(moduleAJs, moduleAJson);

