import Canvas from "./Canvas.js";

const canvas = new Canvas('#canvas')

canvas.polygon(
    [
        {x: 10, y: 10},
        {x: 100, y: 10},
        {x: 50, y: 200},
        {x: 150, y: 30},
    ], {
        strokeStyle: '#333',
        lineWidth: 10,
        lineCap: 'round',
        lineJoin: 'round',
    }
);

canvas.ellipse({
  x: 300,
  y: 200,
  width: 400,
  height: 200,
  rotate: 30,
  fillStyle: 'transparent',
  strokeStyle: 'red',
});

// let rotate = 0;
// let scale = 1;
//
// setInterval(() => {
//     canvas.clear();
//
//     scale += 0.01;
//
//     canvas.rect({
//         x: 100,
//         y: 200,
//         width: 200,
//         height: 100,
//         fillStyle: 'red',
//         strokeStyle: 'green',
//         lineWidth: 10,
//
//         rotate: rotate++,
//         scale
//     });
// }, 16);
