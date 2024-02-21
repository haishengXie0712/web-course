// generator + co === async + await

function sleep(time, msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(msg);
            resolve();
        }, time);
    });
}

async function call() {
    console.log('start');
    await sleep(100, 'call1');
    console.log('end call1');
    await sleep(100, 'call2');
    console.log('end call2');
    console.log('end');
}

call();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
            }

            _next(undefined);
        });
    };
}
function call() {
    return _call.apply(this, arguments);
}
function _call() {
    // mark -> 展示对函数进行原型链上的一些设置, 没有什么特殊操作;
    // https://github1s.com/babel/babel/blob/main/packages/babel-helpers/src/helpers/regeneratorRuntime.js#L156-L157
    // 正还是调用 wrap 返回的 generator 函数
    _call = _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log('start');
                    _context.next = 3;
                    return sleep(100, 'call1');
                case 3:
                    console.log('end call1');
                    _context.next = 6;
                    return sleep(100, 'call2');
                case 6:
                    console.log('end call2');
                    console.log('end');
                case 8:
                case "end":
                    return _context.stop();
            }
        }, _callee);
    }));
    return _call.apply(this, arguments);
}
call();
