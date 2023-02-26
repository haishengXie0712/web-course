/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')
/**
 * 贝塞尔曲线
 * bezierCurveTo
 * */
gd.beginPath()
gd.moveTo(100, 100)
gd.bezierCurveTo(300,100,100,300,300,300)
gd.stroke()

/**
 * 二次曲线
 * quadraticCurveTo
 * */
gd.beginPath()
gd.moveTo(500, 100)
gd.quadraticCurveTo(700,100,700,300)
gd.stroke()

