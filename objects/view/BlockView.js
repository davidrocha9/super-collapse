
import { app, Graphics } from '../../display.js';
import { PIXEL } from '../../constants.js';

export class BlockView {
    constructor(x, y, color) {
        this.x = 10 * PIXEL + x * 40 * PIXEL;
        this.y = 40 * PIXEL + y * 40 * PIXEL;
        this.color = color;
        this.padding = 2 * PIXEL;

        this.graphics = new Graphics();
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        
        this.draw();
    }

    getGraphics() {
        return this.graphics;
    }

    draw() {
        this.graphics.beginFill(this.color)
            .drawRoundedRect(this.x + this.padding, this.y + this.padding,
                (40 - 2 * this.padding) * PIXEL, (40 - 2 * this.padding) * PIXEL, 5)
            .endFill();
            
        app.stage.addChild(this.graphics);
    }

    updateX(units) {
        this.graphics.x += units * 40 * PIXEL;
    }

    updateY(units) {
        this.graphics.y += units * 40 * PIXEL;
    }
}
