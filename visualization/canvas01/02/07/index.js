/**
 * @type {HTMLCanvasElement} canvas
 * */
const canvas = document.getElementById('canvas')
/**
 * @desc 获取图形上下文
 * */
const gd = canvas.getContext('2d')

/**
 * @desc 默认在右侧为起点, 移动到顶部为起点
 * @param {number} n
 * */
function degreeToArc(n) {
    return (n - 90) * Math.PI / 180;
}

const cx = canvas.width / 2, cy = canvas.height / 2, r = 200;

/**
 * @desc 画圆
 * @param {number} startAngle
 * @param {number} endAngle
 * @param {string} color
 * */
function drawPie(startAngle, endAngle, color) {
    gd.beginPath();
    gd.moveTo(cx, cy);
    gd.arc(cx, cy, r, degreeToArc(startAngle), degreeToArc(endAngle), false)
    gd.closePath();
    gd.fillStyle = color;
    gd.fill();
}

const data = [
    {value: 100, color: 'red', startAngle: 0, endAngle: 0},
    {value: 200, color: 'orange', startAngle: 0, endAngle: 0},
    {value: 300, color: 'yellow', startAngle: 0, endAngle: 0},
    {value: 400, color: 'green', startAngle: 0, endAngle: 0},
    {value: 500, color: 'blue', startAngle: 0, endAngle: 0},
]
let angles = 0, base = 0;
data.forEach(item => {
    angles += item.value;
})
data.forEach(item => {
    const angle = 360 * item.value / angles;
    item.startAngle = base;
    item.endAngle = base + angle;
    base += angle;
})
data.forEach(item => {
    drawPie(item.startAngle, item.endAngle, item.color);
})

/**
 * @desc 圆/弧
 * 1. ellipse 椭圆弧
 *  1.1. cx 圆心X
 *  1.2. cy 圆心Y
 *  1.3. rx 水平半径
 *  1.4. ry 垂直半径
 *  1.5. rotation 旋转
 *  1.6. startAngle 开始角度 弧度单位
 *  1.7. endAngle 结束角度 弧度单位
 *  1.8. counterclockwise 是否逆时针
 * 2. arc 正圆弧; (没有两个半径, 只有一个, 没有旋转)
 *  2.1. cx 圆心X
 *  2.2. cy 圆心Y
 *  2.3. r 半径
 *  2.4. startAngle 开始角度 弧度单位
 *  2.5. endAngle 结束角度 弧度单位
 *  2.6. counterclockwise 是否逆时针
 * */
//
// gd.beginPath();
// gd.ellipse(200, 200, 100, 100, 0, 0, Math.PI);
// gd.stroke();
