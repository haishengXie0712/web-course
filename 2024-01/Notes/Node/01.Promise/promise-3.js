import process from "process";

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
/**
 * 采用 Promise 将逻辑改成链式调用的
 * Promise 调用 then 之后可以继续调用 then
 * then 方法中传递的回调是有返回值的, 可以用这个返回值决定下一次 then 的结果
 * 返回值有两类
 * 1. 普通值, 直接作为下一次 then 的成功的结果
 * 2. 是一个 Promise, 那么会根据 Promise 的结果来处理下一次 then 的结果
 * 3. 抛出一个异常, 那么会走下一次 then 的失败
 *
 * 什么时候会走失败?
 * 1. 返回一个失败的 Promise
 * 2. 抛出一个异常
 */

class Promise {
  constructor(executor) {
    // 默认状态是等待态
    this.state = PENDING;
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== PENDING) {
        return;
      }
      this.value = value;
      this.state = FULFILLED;
      this.onResolvedCallbacks.forEach((fn) => fn());
    };

    const reject = (reason) => {
      if (this.state !== PENDING) {
        return;
      }
      this.reason = reason;
      this.state = REJECTED;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      } else if (this.state === FULFILLED) {
        process.nextTick(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === REJECTED) {
        process.nextTick(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}

// 这个规范里面有要求, 所有人的 promise 可以相互调用
function resolvePromise(promise2, x, resolve, reject) {
  // 我们要利用上一次 then 中回调的返回值来决定 promise2 走成功还是失败
  // 判断 x 是不是 Promise 是就 then 它, 如果不是就直接将结果传递下去
}

export default Promise;

