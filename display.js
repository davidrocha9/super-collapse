import { PIXEL, hudStyle } from './constants.js';

const app = new PIXI.Application({
  width: 920 * PIXEL,
  height: 740 * PIXEL,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0xff9b00;

document.body.appendChild(app.view);

const ticker = PIXI.Ticker;

const Graphics = PIXI.Graphics;

function createGradientTexture(x1, y1, x2, y2, color1, color2) {
  const canvas = document.createElement('canvas');
  canvas.width = app.renderer.width;
  canvas.height = app.renderer.height;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return PIXI.Texture.from(canvas);
}

const gradientTexture = createGradientTexture(
  app.renderer.width / 2,
  app.renderer.height,
  app.renderer.width / 2,
  0,
  '#080808',
  '#474747'
);

const backgroundGrid = new Graphics();
backgroundGrid
  .beginTextureFill({ texture: gradientTexture })
  .drawRect(10 * PIXEL, 40 * PIXEL, 480 * PIXEL, 640 * PIXEL)
  .endFill();

app.stage.addChild(backgroundGrid);

function drawUpcomingGrid() {
    for (let i = 0; i < 12; i++) {
        let upcomingGrid = new Graphics();
        upcomingGrid.beginFill(0x484444)
            .lineStyle(3, 0xfef392, 1)
            .drawRect(10*PIXEL + 40*i*PIXEL, 683*PIXEL, 40*PIXEL, 40*PIXEL)
            .endFill();

        app.stage.addChild(upcomingGrid);
    }
}

drawUpcomingGrid()

const gridLine = new Graphics();
gridLine.lineStyle(2, 0x000000, 1)
    .drawRect(9*PIXEL, 40*PIXEL, 482*PIXEL, 684*PIXEL);

app.stage.addChild(gridLine);

// Create a custom gradient texture
const hudTexture = createGradientTexture(0, 0, app.renderer.width, app.renderer.height, '#ffc300', '#ffaa00');

// draw red line rectangle
const hud = new Graphics();
hud.beginFill(0xffffff)
    .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL)
    .endFill();

// new circle and append to hud
const circle = new Graphics();
circle.beginTextureFill({ texture: hudTexture })
    .lineStyle(3, 0xfef392, 1)
    .drawCircle(100*PIXEL, 300*PIXEL, 700*PIXEL, 700*PIXEL)
    .endFill();
circle.filters = [new PIXI.filters.BlurFilter(10)];

const mask = new PIXI.Graphics();
mask.beginFill(0x000000); // Mask color (black)
mask.drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 700*PIXEL); // Mask position and size
mask.endFill();

circle.mask = mask; // Apply the mask to the circle

app.stage.addChild(hud);
app.stage.addChild(circle); // Add the circle to the stage
app.stage.addChild(mask);

const hudLine = new Graphics();
hudLine.lineStyle(4, 0xfcf191, 1)
    .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL);

app.stage.addChild(hudLine);

function writePlaceholder(text, x, y, style, spacing, x_stretch, y_stretch) {
    // iterate string text
    for (let i = 0; i < text.length; i++) {
        let placeholder = new PIXI.Text(text[i], style);
        placeholder.x = x + i * spacing;
        placeholder.y = y - 2.5 * (1 - (i % 2));
        placeholder.scale.x = x_stretch;
        placeholder.scale.y = y_stretch;
        app.stage.addChild(placeholder);
    }
    
}

const scoreRect = new Graphics();
scoreRect.beginFill(0xffffff)
    .lineStyle(3, 0xfef392, 1)
    .drawRoundedRect(550*PIXEL, 200*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
    .endFill();

app.stage.addChild(scoreRect);

writePlaceholder('SCORE', 600*PIXEL, 180*PIXEL, hudStyle, 15, 1, 1);

const levelRect = new Graphics();
levelRect.beginFill(0xffffff)
    .lineStyle(3, 0xfef392, 1)
    .drawRoundedRect(550*PIXEL, 300*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
    .endFill();

app.stage.addChild(levelRect);

writePlaceholder('LEVEL', 600*PIXEL, 280*PIXEL, hudStyle, 15, 1, 1);

const linesLeftRect = new Graphics();
linesLeftRect.beginFill(0xffffff)
    .lineStyle(3, 0xfef392, 1)
    .drawRoundedRect(550*PIXEL, 400*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
    .endFill();

app.stage.addChild(linesLeftRect);

writePlaceholder('LINES LEFT', 570*PIXEL, 380*PIXEL, hudStyle, 15, 1, 1);

const superStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 4,
    dropShadowDistance: 2,
    fill: "#fff59a",
    fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
    fontSize: 50,
    fontStyle: "italic",
    fontWeight: "bold",
    letterSpacing: 3,
    strokeThickness: 2
});
const superText = new PIXI.Text('Super', superStyle);
superText.x = 570*PIXEL;
superText.y = 0;
app.stage.addChild(superText);

const collapseStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAlpha: 0.75,
    dropShadowAngle: -1.5,
    dropShadowBlur: 4,
    dropShadowColor: "#ffffff",
    fill: "#ffffff",
    fontFamily: "Arial Black",
    fontSize: 30,
    fontWeight: "bold",
    strokeThickness: 3
});

writePlaceholder("COLLAPSE!", 545*PIXEL, 80*PIXEL, collapseStyle, 22.5, 1, 1.75);

const whiteBlock = new Graphics();
whiteBlock.beginFill(0xffffff)
    .drawRoundedRect(10, 40, 100, 100)
    .endFill();

//app.stage.addChild(whiteBlock);

// Export the Graphics class
export { app, Graphics, ticker };