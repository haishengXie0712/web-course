//图形中心做原点
export default class Zanvas {
    constructor(arg) {
        //canvas
        if (typeof arg == 'string') {
            this.canvas = document.querySelector(arg);
        } else if (arg && arg.tagName == 'CANVAS') {
            this.canvas = arg;
        }

        if (!this.canvas) {
            throw new Error('arg must is string or canvas element');
        }

        //gd
        this.gd = this.canvas.getContext('2d');
        if (!this.gd) {
            throw new Error('canvas error(getContext)')
        }

        //default
        this.default = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fillStyle: '#333',
            strokeStyle: 'transparent',
            lineWidth: 1,

            rotate: 0,
            scale: [1, 1]
        };
    }

    //图形
    rect(options) {
        const {
            x,
            y,
            width,
            height,

            rotate,
            scale,
        } = this._getDefaultOptions(options);
        const {gd} = this;


        gd.beginPath();
        gd.save();

        gd.translate(x + width / 2, y + height / 2);
        gd.rotate(degree2arc(rotate));

        if (scale instanceof Array) {
            gd.scale(...scale);
        } else {
            gd.scale(scale, scale);
        }


        gd.rect(-width / 2, -height / 2, width, height);

        this._fill(options);
        this._stroke(options);

        gd.restore();
    }

    ellipse(options) {
        const {
            x,
            y,
            width,
            height,

            rotate,

            fillStyle,
        } = this._getDefaultOptions(options);
        const {gd} = this;

        gd.save();
        gd.beginPath();

        gd.ellipse(
            x, y,
            width / 2, height / 2,

            degree2arc(rotate),

            0, Math.PI * 2,
        );

        this._fill(options);
        this._stroke(options);


        gd.restore();
    }

    polyline(points = [], options) {
        this._poly(points);
        this._stroke(options);
    }

    polygon(points = [], options) {
        this._poly(points);
        this._fill(options);
    }

    _poly(points) {
        const {gd} = this;

        gd.beginPath();

        points.forEach(({x, y}, index) => {
            if (index == 0) {
                gd.moveTo(x, y);
            } else {
                gd.lineTo(x, y);
            }
        });
    }


    clear() {
        this.gd.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    _fill(options) {
        const {fillStyle} = this._getDefaultOptions(options);
        const {gd} = this;

        gd.fillStyle = fillStyle;

        gd.fill();
    }

    _stroke(options) {
        const {
            strokeStyle,
            lineWidth,
            lineCap,
            lineJoin
        } = this._getDefaultOptions(options);
        const {gd} = this;

        gd.strokeStyle = strokeStyle;
        gd.lineWidth = lineWidth;
        gd.lineCap = lineCap;
        gd.lineJoin = lineJoin;

        gd.stroke();
    }

    _getDefaultOptions(options = {}) {
        for (let key in this.default) {
            options[key] = options[key] || this.default[key];
        }

        return options;
    }
}


export function degree2arc(n) {
    return n * Math.PI / 180;
}

export function arc2degree(n) {
    return n * 180 / Math.PI;
}
