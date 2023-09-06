
import { app, Graphics } from '../../display.js';
import { PIXEL } from '../../constants.js';

export class BombView {
    constructor(model) {
        this.model = model;
        this.graphics = new Graphics();
        this.circleGraphics = new Graphics();

        this.graphics.interactive = true;
        this.graphics.buttonMode = true;

        this.circleGraphics.interactive = true;
        this.circleGraphics.buttonMode = true;

        this.draw();
    }
    
    getGraphics() {
        return this.graphics;
    }

    getCircleGraphics() {
        return this.circleGraphics;
    }

    draw() {
        const blockSize = 40 * PIXEL;
        const padding = 2 * PIXEL;
        const x = 10 * PIXEL + this.model.x * blockSize;
        const y = 43 * PIXEL + this.model.y * blockSize;
    
        this.graphics.beginFill(this.model.color)
            .drawRect(this.model.x * 40 * PIXEL + 33 * PIXEL, this.model.y * 40 - 3 * PIXEL, 10 * PIXEL, 10 * PIXEL, 5)
            .endFill();

        this.circleGraphics.beginFill(0x000000); // Set the fill color to black
        this.circleGraphics.drawCircle(this.model.x * 40 * PIXEL + 30 * PIXEL, this.model.y * 40 * PIXEL + 65 * PIXEL, 15 * PIXEL);
        this.circleGraphics.endFill();

        this.graphics.pivot.set(x, y);
        this.graphics.position.set(x, y);

        this.graphics.rotation = 0.75;

        app.stage.addChild(this.graphics);
        app.stage.addChild(this.circleGraphics);
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);
            // Optional: You can destroy the graphics object to free up memory
            this.graphics.destroy();
        }

        if (this.circleGraphics.parent) {
            this.circleGraphics.parent.removeChild(this.circleGraphics);
            // Optional: You can destroy the graphics object to free up memory
            this.circleGraphics.destroy();
        }
    }

    updateX(units) {
        this.graphics.x += units * 40 * PIXEL;
        this.circleGraphics.x += units * 40 * PIXEL;
    }

    updateY(units) {
        this.graphics.y += units * 40 * PIXEL;
        this.circleGraphics.y += units * 40 * PIXEL;
    }
}
