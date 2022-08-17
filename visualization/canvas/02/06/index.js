/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

gd.fillStyle = 'red'
gd.fillRect(0, 0, 100, 100)
gd.strokeStyle = 'yellow'
gd.strokeRect(100, 100, 100, 100)
gd.strokeStyle = 'green'
// 绘制路径
gd.rect(200, 200, 100, 100)
gd.stroke()
