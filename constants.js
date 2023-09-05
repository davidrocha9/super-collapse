import { app, PIXEL, RATIO } from './display.js';

// 1=blue, 2=green, 3=red
const COLORS = {
    1: 0x0000ff,
    2: 0x00ff00,
    3: 0xff0000,
};

const SEED = Date.now().toString();
var rng = new Math.seedrandom(SEED);

const hudStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 4,
    dropShadowDistance: 3,
    fill: "#ffffff",
    fontFamily: "Impact, Charcoal, sans-serif",
    fontSize: RATIO *  25,
    stroke: "#e28503",
    strokeThickness: 2
});

const scoreStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 4,
    dropShadowDistance: 3,
    fill: "#ffffff",
    fontFamily: "Impact, Charcoal, sans-serif",
    fontSize: RATIO *  35,
    stroke: "#e28503",
    strokeThickness: 2
});

const backToMenuStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 4,
    dropShadowDistance: 3,
    fill: "#ffffff",
    fontFamily: "Impact, Charcoal, sans-serif",
    fontSize: RATIO *  25,
    stroke: "#e28503",
    strokeThickness: 2
});

const superStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 4,
    dropShadowDistance: 2,
    fill: "#fff59a",
    fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
    fontSize: RATIO *  50,
    fontStyle: "italic",
    fontWeight: "bold",
    letterSpacing: 3,
    strokeThickness: 2
});

const collapseStyle = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAlpha: 0.75,
    dropShadowAngle: -1.5,
    dropShadowBlur: 4,
    dropShadowColor: "#ffffff",
    fill: "#ffffff",
    fontFamily: "Arial Black",
    fontSize: RATIO *  30,
    fontWeight: "bold",
    strokeThickness: 3
});

function writePlaceholder(text, x, y, style, spacing, x_stretch, y_stretch) {
    // iterate string text
    const placeholders = [];
    
    for (let i = 0; i < text.length; i++) {
        let placeholder = new PIXI.Text(text[i], style);
        placeholder.x = x + RATIO * i * spacing;
        placeholder.y = y - 2.5 * (1 - (i % 2));
        placeholder.scale.x = x_stretch;
        placeholder.scale.y = y_stretch;
        app.stage.addChild(placeholder);
        placeholders.push(placeholder);
    }
    
    return placeholders;
}

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

export { PIXEL, COLORS, rng, hudStyle, scoreStyle, backToMenuStyle, superStyle, collapseStyle, writePlaceholder, createGradientTexture, gradientTexture, drawUpcomingGrid };