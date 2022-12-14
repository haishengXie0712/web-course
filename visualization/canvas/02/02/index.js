/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

// 路径操作-指定操作范围, 不会实际绘图
gd.moveTo(100,100) // 设定起点
gd.lineTo(100, 600) // 目标点
// 边线颜色, 支持任何类型颜色; rgba(0,0,0,1); rgb(0,0,0); #000; black;
gd.strokeStyle = 'red'
// 边线宽度;
gd.lineWidth = 1
// 划线
gd.stroke()

gd.moveTo(200, 100)
gd.lineTo(300, 100)
gd.lineTo(300, 200)
gd.lineTo(200, 200)
gd.closePath()
// 填充颜色, 支持任何类型颜色; rgba(0,0,0,1); rgb(0,0,0); #000; black;
gd.fillStyle = 'red'
gd.fill()

gd.moveTo(400, 100)
gd.lineTo(400, 600)
gd.lineWidth = 50
const gradient01 = gd.createLinearGradient(400, 100, 400, 600)
gradient01.addColorStop(0, 'red')
gradient01.addColorStop(0.5, 'yellow')
gradient01.addColorStop(1, 'green')
gd.strokeStyle = gradient01
gd.stroke()

gd.rect(700, 0, 100, 800)
gd.lineWidth = 1
const gradient02 = gd.createRadialGradient(700, 0, 20, 700, 800, 20)
gradient02.addColorStop(0, 'red')
gradient02.addColorStop(0.5, 'yellow')
gradient02.addColorStop(1, 'green')
gd.fillStyle = gradient02
gd.fill()

