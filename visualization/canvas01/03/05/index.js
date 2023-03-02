let canvas = document.querySelector('#canvas');
let gd = canvas.getContext('2d');

const W = 500,
    H = 500,
    coverWidth = 40,
    x = canvas.width / 2,
    y = canvas.height / 2;
const r = W / 2;


//表盘
gd.beginPath();
gd.arc(
    x, y, r + coverWidth / 2,
    0, Math.PI * 2
);

const gradient = gd.createRadialGradient(
    x, y, r,
    x, y, r + coverWidth,
);

gradient.addColorStop(0, '#EEE');
gradient.addColorStop(0.5, '#FFF');
gradient.addColorStop(1, '#999');
gd.lineWidth = coverWidth;
gd.strokeStyle = gradient;
gd.stroke();


gd.beginPath();
gd.arc(
    x, y, r + coverWidth,
    0, Math.PI * 2
);

gd.lineWidth = 1;
gd.strokeStyle = '#666';
gd.stroke();


gd.beginPath();
gd.arc(
    x, y, r,
    0, Math.PI * 2
);

gd.lineWidth = 1;
gd.strokeStyle = '#666';
gd.stroke();


//刻度
for (let i = 0; i < 60; i++) {
    let w, h;

    if (i % 5 == 0) {
        w = 6, h = 20;
    } else {
        w = 2, h = 10;
    }


    gd.save();

    const ox = w / 2,
        oy = r;

    gd.translate(x, y);
    gd.rotate(i * 6 * Math.PI / 180);

    // gd.fillRect(x - w / 2, y - r, w, h);
    gd.fillRect(-ox, -oy, w, h);

    gd.restore();
}

//数字

//指针
