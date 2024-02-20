const fs = require('fs').promises;
const path = require('path');
const co = require('co');

function resolveAssets(_path) {
    return path.join(__dirname, '../test-file', _path);
}

function* read(source) {
    const url = yield fs.readFile(resolveAssets(source), 'utf8').then((content) => content.replace('\n', ''));
    const content = yield fs.readFile(resolveAssets(url), 'utf8').then((content) => content.replace('\n', ''));
    return content;
}

// const it = read('file.txt');
// const { value } = it.next();
// value.then((url) => {
//     const { value } = it.next(url);
//     value.then((content) => {
//         console.log(content);
//     });
// });
co(read('file.txt')).then((content) => {
    console.log(content);
});
co1(read('file.txt')).then((content) => {
    console.log(content);
});

function co1(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            const { value, done } = it.next(data);
            if (!done) {
                Promise.resolve(value).then((data) => {
                    next(data);
                }, reject);
            } else {
                resolve(value)
            }
        }
        next();
    });
}
