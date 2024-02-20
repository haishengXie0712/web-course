// function* gen() {
//     let a = yield 'sleep';
//     console.log(`a: ${ a }`);
//     let b = yield 'eat';
//     console.log(`b: ${ b }`);
//     let c = yield 'coding';
//     console.log(`c: ${ c }`);
// }
const runtime = {
    wrap(generatorFn) {
        const _context = {
            prev: 0,
            next: 0,
            sent: 0,
            done: false,
            stop() {
                this.done = true;
            }
        }
        return {
            next(arg) {
                _context.sent = arg;
                return {
                    value: generatorFn(_context),
                    done: _context.done
                }
            },
        }
    }
}
function gen() {
    var a, b, c;
    return runtime.wrap(function gen$(_context) {
        switch (_context.prev = _context.next) {
            case 0:
                _context.next = 2;
                return 'sleep';
            case 2:
                a = _context.sent;
                console.log("a: ".concat(a));
                _context.next = 6;
                return 'eat';
            case 6:
                b = _context.sent;
                console.log("b: ".concat(b));
                _context.next = 10;
                return 'coding';
            case 10:
                c = _context.sent;
                console.log("c: ".concat(c));
            case 12:
            case "end":
                return _context.stop();
        }
    });
}

const it = gen();
console.log(it.next());
console.log(it.next('sleep'));
console.log(it.next('eat'));
console.log(it.next('coding'));
