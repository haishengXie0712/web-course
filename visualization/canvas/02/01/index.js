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
gd.lineTo(300, 300) // 目标点
gd.lineTo(300, 100)
gd.lineTo(100, 300)
gd.closePath()

// 绘图
// gd.stroke(); // 绘制边框
gd.fill() // 填充: 会自动闭合-从最后一个点到起点
