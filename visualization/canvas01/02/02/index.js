/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

gd.beginPath()
// 路径操作-指定操作范围, 不会实际绘图
gd.moveTo(100, 100) // 设定起点
gd.lineTo(100, 600) // 目标点
// 边线颜色, 支持任何类型颜色; rgba(0,0,0,1); rgb(0,0,0); #000; black;
gd.strokeStyle = 'red'
// 边线宽度;
gd.lineWidth = 1
// 划线
gd.stroke()

gd.beginPath()
gd.moveTo(200, 100)
gd.lineTo(300, 100)
gd.lineTo(300, 200)
gd.lineTo(200, 200)
gd.closePath()
// 填充颜色, 支持任何类型颜色; rgba(0,0,0,1); rgb(0,0,0); #000; black;
gd.fillStyle = 'red'
gd.fill()

// 线性渐变
gd.beginPath()
gd.moveTo(400, 100)
gd.lineTo(400, 600)
gd.lineWidth = 50
const gradient01 = gd.createLinearGradient(400, 100, 400, 600)
gradient01.addColorStop(0, 'red')
gradient01.addColorStop(0.5, 'yellow')
gradient01.addColorStop(1, 'green')
gd.strokeStyle = gradient01
gd.stroke()

// 切线渐变
gd.beginPath()
gd.rect(500, 0, 100, 800)
const gradient02 = gd.createRadialGradient(550, 0, 50, 550, 800, 0)
gradient02.addColorStop(0, 'red')
gradient02.addColorStop(0.5, 'yellow')
gradient02.addColorStop(1, 'green')
gd.fillStyle = gradient02
gd.fill()

// 环形渐变
gd.beginPath()
gd.rect(700, 100, 100, 100)
const gradient03 = gd.createConicGradient(0, 750, 150);
gradient03.addColorStop(0, 'red');
gradient03.addColorStop(0.25, 'orange');
gradient03.addColorStop(0.5, 'yellow');
gradient03.addColorStop(0.75, 'green');
gradient03.addColorStop(1, 'blue');
gd.fillStyle = gradient03;
gd.fill();

