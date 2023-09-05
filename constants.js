import { app, Graphics, PIXEL, RATIO } from './display.js';

const LIGHTBLACK = 0x484444;
const BACKGROUND = 0xff9b00;
const LIGHTYELLOW = 0xfef392;
const WHITE = 0xffffff;
const BLACK = 0x000000;
const RED = 0xff0000;
const GREEN = 0x00ff00;
const BLUE = 0x0000ff;
const ORANGE = 0xe28503;

// 1=blue, 2=green, 3=red
const COLORS = {
    1: BLUE,
    2: GREEN,
    3: RED,
};

const PADDING = 2 * PIXEL;

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
    fontSize: RATIO *  60,
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
        upcomingGrid.beginFill(LIGHTBLACK)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRect(10*PIXEL + 40*i*PIXEL, 683*PIXEL, 40*PIXEL, 40*PIXEL)
            .endFill();

        app.stage.addChild(upcomingGrid);
    }
}

function drawLogo(x, y) {
    const elements = [];

    const whiteBlock = new Graphics();
    whiteBlock.beginFill(WHITE)
        .lineStyle(1, BLACK, 1)
        .drawRoundedRect(x * PIXEL, (y + 15) * PIXEL,
            60 * PIXEL, 60 * PIXEL, 5)
        .endFill();

    app.stage.addChild(whiteBlock);
    elements.push(whiteBlock);

    const redBlock = new Graphics();
    redBlock.beginFill(RED)
        .lineStyle(1, BLACK, 1)
        .drawRoundedRect((x + 60) * PIXEL, y * PIXEL,
            60 * PIXEL, 60 * PIXEL, 5)
        .endFill();

    app.stage.addChild(redBlock);
    elements.push(redBlock);

    const greenBlock = new Graphics();
    greenBlock.beginFill(GREEN)
        .lineStyle(1, BLACK, 1)
        .drawRoundedRect((x + 120) * PIXEL, y * PIXEL,
            60 * PIXEL, 60 * PIXEL, 5)
        .endFill();

    app.stage.addChild(greenBlock);
    elements.push(greenBlock);

    const blueBlock = new Graphics();
    blueBlock.beginFill(BLUE)
        .lineStyle(1, BLACK, 1)
        .drawRoundedRect((x + 180) * PIXEL, (y + 15) * PIXEL,
            60 * PIXEL, 60 * PIXEL, 5)
        .endFill();

    app.stage.addChild(blueBlock);
    elements.push(blueBlock);

    const superText = new PIXI.Text('Super', superStyle);
    superText.x = (x + 40) * PIXEL;
    superText.y = (y - 45) * PIXEL;
    app.stage.addChild(superText);
    elements.push(superText);

    const placeholders = writePlaceholder("COLLAPSE!", (x + 20) * PIXEL, (y + 30) * PIXEL, collapseStyle, 22.5, 1, 1.75);

    for (const placeholder of placeholders) {
        placeholder.scale.y = 2.25;
        elements.push(placeholder);
    }

    return elements;
}

function drawBlocks() {
    const elements = [];

    for (let x = 0; x < 24; x++) {
        for (let y = 0; y < 19; y++) {
            if (x > 6 && x < 16 && y > 2 && y < 15) continue;
            let block = new Graphics();
            block.beginFill(COLORS[Math.floor(rng() * 1000 % 3) + 1])
                .lineStyle(1, BLACK, 1)
                .drawRoundedRect(x * 40 * PIXEL, y * 40 * PIXEL - 10 * PIXEL,
                    40 * PIXEL, 40 * PIXEL, 5)
                .endFill();

            // Add blur filter
            const blurFilter = new PIXI.filters.BlurFilter();
            blurFilter.blur = 5; // Adjust the blur intensity as needed
            block.filters = [blurFilter];

            app.stage.addChild(block);
            elements.push(block);
        }
    }

    return elements;
}

export { PIXEL, PADDING, COLORS, rng,
    hudStyle, scoreStyle, backToMenuStyle, superStyle,
    collapseStyle, writePlaceholder, createGradientTexture, gradientTexture,
    drawUpcomingGrid, drawLogo, drawBlocks, LIGHTBLACK,
    BACKGROUND, LIGHTYELLOW, WHITE, BLACK,
    RED, GREEN, BLUE, ORANGE };