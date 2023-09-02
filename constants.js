const PIXEL = window.innerHeight / 740;

// new dictionary with 1=blue, 2=green, 3=red
const COLORS = {
    1: 0x0000ff,
    2: 0x00ff00,
    3: 0xff0000,
};

const SEED = Date.now().toString();
var rng = new Math.seedrandom(SEED);

export { PIXEL, COLORS, rng };