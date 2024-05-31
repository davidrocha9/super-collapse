const GAME_HEIGHT = window.innerHeight * 0.9;
const GAME_WIDTH = 920/740 * GAME_HEIGHT;
const RATIO = 0.8;
const PIXEL = GAME_HEIGHT / GAME_WIDTH;
const PIXEL_WIDTH = GAME_WIDTH / 920;
const PIXEL_HEIGHT = GAME_HEIGHT / 740;

const app = new PIXI.Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0xff9b00;

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

export { app, Graphics, GAME_WIDTH, GAME_HEIGHT, PIXEL, PIXEL_WIDTH, PIXEL_HEIGHT, RATIO };