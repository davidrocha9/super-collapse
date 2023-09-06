
import { app, Graphics } from '../../display.js';
import { PIXEL, PADDING } from '../../constants.js';

export class BlockView {
    constructor(x, y, color) {
        this.x = 10 * PIXEL + x * 40 * PIXEL;
        this.y = 40 * PIXEL + y * 40 * PIXEL;
        this.color = color;

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
            .drawRoundedRect(this.x + PADDING, this.y + PADDING,
                (40 - 2 * PADDING) * PIXEL, (40 - 2 * PADDING) * PIXEL, 5)
            .endFill();
            
        app.stage.addChild(this.graphics);
    }

    updateX(units) {
        this.graphics.x += units * 40 * PIXEL;
    }

    updateY(units) {
        this.graphics.y += units * 40 * PIXEL;
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);
            // Optional: You can destroy the graphics object to free up memory
            this.graphics.destroy();
        }
    }

}
