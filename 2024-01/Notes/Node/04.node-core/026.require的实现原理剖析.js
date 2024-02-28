const value = require("../test-file/moduleA.js");

console.log(value);
/**
 * 分析模块加载的流程
 * 1. 加载模块 Module.＿load 加载模块之后 最终返回的就是module.exports
 * 2. Module.＿resolveFilename 解析文件名, 产生一个可读取的文件名 .js? .json?
 * 3. Module, ＿cache 如果文件被缓存过 直接拿上一次的返回结果
 * 4. 如果模块没有加载过, 会根据路径创建一个模块 new Module(){id：文件名, exports：导出结果}
 * 5. 缓存模块为了后续使用
 * 6. module.load 加载模块(读文件)
 * 7. 获取扩展名来调用不同的加载方式
 * 8. 根据扩展名查找 对应的加载方式 Module.＿extension
 * 9. js的模块主要是读取
 * 10. 读取文件后包裹函数, 并且传入五个参数［＇exports＇, ＇require＇, ＇module＇, ＇＿ filename＇,  ＇＿dirname＇］
 * 11. 执行函数 用户会给module.exports 赋予值
 * 12. 因为最终返回的是module.exports 所以可以拿到最终的返回结果
 */
