/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')
gd.lineCap = 'round'
gd.lineJoin = 'round'
gd.lineWidth = 10

gd.beginPath()
gd.moveTo(100, 200)
gd.lineTo(200, 600)
gd.lineTo(300, 200)
gd.strokeStyle = 'red'
gd.stroke()


gd.beginPath()
gd.moveTo(300, 200)
gd.lineTo(400, 600)
gd.lineTo(500, 200)
gd.strokeStyle = 'orange'
gd.stroke()


gd.beginPath()
gd.moveTo(500, 200)
gd.lineTo(600, 600)
gd.lineTo(700, 200)
gd.strokeStyle = 'yellow'
gd.stroke()
