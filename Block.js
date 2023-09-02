import { app, Graphics } from './display.js';
import { PIXEL } from './constants.js';

export class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        // Create the block graphics object
        this.graphics = new Graphics();
        this.graphics.interactive = true; // Make the object interactive
        this.graphics.buttonMode = true; // Change cursor to pointer on hover

        // Draw the block
        this.draw();
    }

    draw() {
        const x = 10 * PIXEL + this.x * 40 * PIXEL;
        const y = 40 * PIXEL + this.y * 40 * PIXEL;

        const padding = 2 * PIXEL; // Define the padding value

        this.graphics.clear(); // Clear previous graphics
        this.graphics.beginFill(this.color)
            .drawRoundedRect(x + padding, y + padding, (40 - 2 * padding) * PIXEL, (40 - 2 * padding) * PIXEL, 5)
            .endFill();

        // Add the block to the stage
        app.stage.addChild(this.graphics);
    }
}
