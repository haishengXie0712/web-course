// 参数的传递: 参数先行
const source = 'xhs lll'; // 转成 XHS_LLL

// function programming -> 函数式编程
const fp = require('lodash/fp');
const composeFn1 = fp.flowRight(fp.toUpper, fp.join('_'), fp.split(' '));
console.log(composeFn1(source));

// 原始的lodash
const _ = require('lodash');
// 需要把参数先行 -> 组装成新的函数
const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, arr) => _.join(arr, sep));
const composeFn2 = _.flowRight(_.toUpper, join('_'), split(' '));
console.log(composeFn2(source));
