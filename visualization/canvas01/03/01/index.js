/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')


/**
 * @desc
 * 1. transform 的原点默认是 canvas 的左上角
 *  1.1. transform起作用的顺序是'反的';
 *  1.2. 多次 transform, 是叠加效果;
 *
 * 2. 调整 canvas 的 "原点"
 *  2.1. canvas的原点在左上角(0, 0);
 *  2.2. canvas的原点固定死的;
 *
 * 3. 自己调整图形中间设置为(0, 0), 这样就是对于中心进行 translate 即可;
 * */


drawRect(100, 100, 200, 200)

function drawRect(x, y, w, h) {
    const realX = x + w / 2;
    const realY = y + h / 2;
    gd.translate(realX, realY)
    gd.scale(0.5, 0.5)
    gd.rotate(45 * Math.PI / 180)
    gd.strokeRect(w / 2 * -1, h / 2 * -1, w, h)
}
