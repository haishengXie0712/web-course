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
drawRect1(100, 100, 200, 200, 0.5, 0.5, 30)
drawRect2(100, 100, 200, 200, 0.5, 0.5, 30)
drawRect3(100, 100, 200, 200, 0.5, 0.5, 30)
gd.moveTo(100,95);
gd.lineTo(100,105);
gd.moveTo(95,100);
gd.lineTo(105,100);
gd.strokeStyle = 'red';
gd.stroke();

function drawRect1(x, y, w, h, scaleX = 1, scaleY = 1, angle = 0) {
    gd.save()
    const realX = x;
    const realY = y;
    gd.translate(realX, realY)
    gd.scale(scaleX, scaleY)
    gd.rotate(angle * Math.PI / 180)
    gd.strokeRect(0, 0, w, h)
    gd.restore()
}
function drawRect2(x, y, w, h, scaleX = 1, scaleY = 1, angle = 0) {
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
function drawRect3(x, y, w, h, scaleX = 1, scaleY = 1, angle = 0) {
    gd.save()
    const realX = x + w;
    const realY = y + h;
    gd.translate(realX, realY)
    gd.scale(scaleX, scaleY)
    gd.rotate(angle * Math.PI / 180)
    gd.strokeRect(-w, -h, w, h)
    gd.restore()
}
/**
 * 宽高: w, h
 *
 * 沿着自己的左上角 (0, 0)
 * 绘制点: -0, -0
 * 偏移量: x, y
 *
 * 沿着自己的中心 (w / 2, h / 2)
 * 绘制点: -w / 2, -h / 2
 * 偏移量: x + w / 2, y + h / 2
 *
 * 沿着自己的右下角 (w, h)
 * 绘制点: -w, -h
 * 偏移量: x + w, y + h
 * */
