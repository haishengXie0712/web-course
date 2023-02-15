/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

gd.globalAlpha = 0.3
drawRect(100, 100, canvas.width - 200, canvas.height - 200)
gd.globalAlpha = 1

function drawRect(x, y, w, h) {
    gd.beginPath()
    gd.moveTo(x, y);
    gd.lineTo(x + w, y)
    gd.lineTo(x + w, y + h)
    gd.lineTo(x, y + h)
    gd.closePath()

    gd.shadowColor = 'rgba(0,0,0,0.3)'
    gd.shadowBlur = 10
    gd.shadowOffsetX = 10
    gd.shadowOffsetY = 10

    gd.fillStyle = 'red'
    gd.fill()
}
