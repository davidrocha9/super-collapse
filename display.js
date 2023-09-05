const RATIO = 1;
const PIXEL = window.innerHeight / 740 * RATIO;

const app = new PIXI.Application({
  width: 920 * PIXEL,
  height: 740 * PIXEL,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0xff9b00;

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

export { app, Graphics, PIXEL, RATIO };