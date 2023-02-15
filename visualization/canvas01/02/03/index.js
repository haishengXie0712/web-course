/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')
const fontSize = 30, lineHeight = fontSize + 10;
gd.textBaseline = 'top';
gd.textAlign = 'left'
gd.font = `${fontSize}px 宋体`
const text = '如今，全民健身成为一种时尚，但对于那些平时缺乏运动的上班族来说，很容易出现运动损伤。该怎样避免运动损伤？膝盖不好的人该如何运动？8月8日全民健身日，听骨科医生孙浩林为你答疑解惑，一起科学运动！（统筹：李昉 策划：唐婕 陈琦 邵文婷 制作：李佳 关萌 郑嘉豪）'
const lines = []
let line = ''
for (let i = 0; i < text.length; i++) {
    // 一行文字是否超出 canvas 宽度
    if (gd.measureText(line + text[i]).width > canvas.width) {
        lines.push(line)
        line = ''
    }
    line += text[i]
}
lines.push(line)
lines.forEach((line, index) => {
    gd.fillText(line, 0, lineHeight * index + (lineHeight - fontSize) / 2)
})

// gd.fillStyle = 'red'
// // 可以和 css 的 font 差不多属性, 但是顺序不同; 而且没有行的概念 所以不可以给line-height等属性
// gd.font = 'bold italic 20px 宋体'
// // 左右居中
// gd.textAlign = 'left'
// // 基线位置, 上面比较好算
// gd.textBaseline = 'top'
// // 绘制填充字
// gd.fillText('中文文字', 0 , 0)

// gd.strokeStyle = 'red'
// gd.font = 'bold italic 20px 宋体'
// // 左右居中
// gd.textAlign = 'left'
// // 基线位置, 上面比较好算
// gd.textBaseline = 'top'
// // 绘制描边字
// gd.strokeText('中文文字', 0 , 500)
