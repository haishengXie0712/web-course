const {sum, subtract} = require('./demo');

test('sum', () => {
    expect(sum(1, 2)).toBe(3)
})

test('subtract', () => {
    expect(subtract(2, 1)).toBe(1)
})
