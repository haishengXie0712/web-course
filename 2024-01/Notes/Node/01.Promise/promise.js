const process = require("process");

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
      if (value instanceof Promise) {
        value.then(resolve, reject);
        return;
      }
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
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
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
              let x = onRejected(this.reason);
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
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(callback) {
    return this.then(
      (data) => {
        return Promise.resolve(callback()).then(() => data);
      },
      (err) => {
        return Promise.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
  }
  static deferred() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        // 一起去比较快慢, 谁快用谁的结果
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let i = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then((data) => {
          arr[index] = data;
          if (++i === promises.length) {
            resolve(arr);
          }
        }, reject);
      });
    });
  }
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let i = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (data) => {
            arr[index] = { status: "fulfilled", value: data };
            if (++i === promises.length) {
              resolve(arr);
            }
          },
          (err) => {
            arr[index] = { status: "rejected", reason: err };
            if (++i === promises.length) {
              resolve(arr);
            }
          }
        );
      });
    });
  }
}

// 这个规范里面有要求, 所有人的 promise 可以相互调用
// 我们要利用上一次 then 中回调的返回值来决定 promise2 走成功还是失败
// 判断 x 是不是 Promise 是就 then 它, 如果不是就直接将结果传递下去
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise 11"));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let isCalled = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (isCalled) return;
            isCalled = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (isCalled) return;
            isCalled = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (isCalled) return;
      isCalled = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = Promise;

