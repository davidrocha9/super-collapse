const PIXEL = window.innerHeight / 740;

// new dictionary with 1=blue, 2=green, 3=red
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
    fontSize: 25,
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
    fontSize: 35,
    stroke: "#e28503",
    strokeThickness: 2
});

export { PIXEL, COLORS, rng, hudStyle, scoreStyle };