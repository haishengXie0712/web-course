const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * Promise 异步的情况处理
 * 调用 then 方法时候, Promise 状态可能还是等待状态, 此时应该将成功的回调和失败的回调存储起来, 等待状态转换之后再执行
 * 一个 Promise 实例可以调用多次 then 方法
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
    if (this.state === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

export default Promise;

