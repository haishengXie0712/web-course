const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    // 默认状态是等待态
    this.state = PENDING;
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    const resolve = (value) => {
      if (this.state !== PENDING) {
        return;
      }
      this.value = value;
      this.state = FULFILLED;
    };

    const reject = (reason) => {
      if (this.state !== PENDING) {
        return;
      }
      this.reason = reason;
      this.state = REJECTED;
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
  }
}

export default Promise;

