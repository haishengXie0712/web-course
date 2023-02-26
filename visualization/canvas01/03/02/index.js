/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

/**
 * @desc 如何消除transform对我们的影响
 * save: 保存当前 canvas 的状态, 不含图形;
 *  transform, strokeStyle, fillStyle, opacity, font 等
 * restore: 恢复上一次存储的状态;
 * */
drawRect(100, 100, 200, 200, 0.5, 0.5, 30)
drawRect(300, 300, 200, 200, 0.5, 0.5, 0)

function drawRect(x, y, w, h, scaleX = 1, scaleY = 1, angle = 0) {
    gd.save()
    const realX = x + w / 2;
    const realY = y + h / 2;
    gd.translate(realX, realY)
    gd.scale(scaleX, scaleY)
    gd.rotate(angle * Math.PI / 180)
    gd.strokeRect(w / 2 * -1, h / 2 * -1, w, h)
    gd.restore()

    // // 土方法: 每次操作之后手动返回到上一次的状态, 也可以实现.
    // gd.rotate(angle * Math.PI / 180 * -1)
    // gd.scale(1 / scaleX, 1 / scaleY)
    // gd.translate(realX * -1, realY * -1)
}
