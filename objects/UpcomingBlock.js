import { app, Graphics } from '../display.js';
import { PIXEL } from '../constants.js';

export class UpcomingBlock {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        // Create the block graphics object
        this.graphics = new Graphics();

        // Draw the block
        this.draw();
    }

    draw() {
        const x = 10 * PIXEL + this.x * 40 * PIXEL;
        const y = 43 * PIXEL + this.y * 40 * PIXEL;

        const padding = 2 * PIXEL; // Define the padding value

        this.graphics.beginFill(this.color)
            .drawRect(x + padding, y + padding, (40 - 2 * padding) * PIXEL, (40 - 2 * padding) * PIXEL, 5)
            .endFill();

        // Add the block to the stage
        app.stage.addChild(this.graphics);
    }

    applyGravity(units) {
        this.y += units;
        this.graphics.y += 40 * units * PIXEL;
    }
    
    slide(units) {
        this.x += units;
        this.graphics.x += 40 * units * PIXEL;
    }    
}
