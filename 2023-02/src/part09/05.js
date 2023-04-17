"use strict";
/**
 * 20. 有效的括号
 * */
function isValid(s) {
    const len = s.length;
    if (len % 2 === 1)
        return false;
    const inChar = '([{', outChar = ')]}', map = {
        '{': '}',
        '[': ']',
        '(': ')',
    };
    const stack = [];
    for (let i = 0; i < len; i++) {
        const char = s[i];
        if (inChar.includes(char)) {
            stack.push(char);
        }
        else if (outChar.includes(char)) {
            if (map[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}
/**
 * 32. 最长有效括号
 * */
function longestValidParentheses(s) {
    const length = s.length;
    if (length <= 1)
        return 0;
    let maxLength = 0;
    const stack = [-1];
    for (let i = 0; i < length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        }
        else {
            stack.pop();
            const stackLen = stack.length;
            if (stackLen === 0) {
                stack.push(i);
            }
            else {
                maxLength = Math.max(maxLength, i - stack[stackLen - 1]);
            }
        }
    }
    return maxLength;
}
console.log(longestValidParentheses('))))()()())'));
