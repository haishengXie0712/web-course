let canvas = document.querySelector('#canvas');
let gd = canvas.getContext('2d');

const tick = () => {
    const W = 500,
        H = W,
        coverWidth = 0.08 * W,
        x = canvas.width / 2,
        y = canvas.height / 2;
    const r = W / 2;

    gd.clearRect(0, 0, canvas.width, canvas.height);


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

        let X = x - w / 2,
            Y = y - r;

        gd.save();

        const ox = w / 2,
            oy = r;

        gd.translate(X + ox, Y + oy);
        gd.rotate(i * 6 * Math.PI / 180);

        // gd.fillRect(x - w / 2, y - r, w, h);
        gd.fillRect(-ox, -oy, w, h);

        gd.restore();
    }

    //数字
    for (let i = 0; i < 60; i += 5) {
        let w = 6,
            h = 20;

        let X = x - w / 2,
            Y = y - r;

        gd.save();

        const ox = w / 2,
            oy = r;

        gd.translate(X + ox, Y + oy);
        gd.rotate(i * 6 * Math.PI / 180);


        let canvas2 = document.createElement('canvas');
        canvas2.width = 200;
        canvas2.height = 100;
        // canvas2.style.border = '1px solid black';
        let gd2 = canvas2.getContext('2d');

        gd2.font = `bold ${0.04*W}px 宋体`;
        gd2.textAlign = 'center';
        gd2.textBaseline = 'middle';

        gd2.translate(canvas2.width / 2, canvas2.height / 2);
        gd2.rotate(-i * 6 * Math.PI / 180);

        // document.body.appendChild(canvas2);

        if (i % 5 == 0) {
            let s = i / 5;


            gd2.fillText(s == 0 ? 12 : s, 0, 0);

            // gd.fillText(s == 0 ? 12 : s, -ox + w / 2, -oy + h);
            gd.drawImage(canvas2, -ox + w / 2 - 100, -oy + h - 50 + 16);
        }

        gd.restore();
    }

    //指针
    const oDate = new Date();
    //时
    drawPointer(0.04 * W, 0.32 * W, (oDate.getHours() + oDate.getMinutes() / 60) * 360 / 12, '#333');
    //分
    drawPointer(0.02 * W, 0.4 * W, (oDate.getMinutes() + oDate.getSeconds() / 60) * 360 / 60, '#333');
    //秒
    drawPointer(0.012 * W, 0.4 * W, oDate.getSeconds() * 360 / 60, 'red');

    function drawPointer(w, h, rotate, color) {
        gd.save();

        gd.translate(x, y);
        gd.rotate(rotate * Math.PI / 180);

        gd.beginPath();
        gd.moveTo(-w / 2, 0);
        gd.lineTo(0, -h);
        gd.lineTo(w / 2, 0);
        gd.lineTo(0, h / 10);
        gd.closePath();


        gd.fillStyle = color;
        gd.fill();

        gd.restore();
    }
}

tick();
setInterval(tick, 1000);
