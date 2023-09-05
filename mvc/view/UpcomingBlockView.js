
import { app, Graphics } from '../../display.js';
import { PIXEL, PADDING } from '../../constants.js';

export class UpcomingBlockView {
    constructor(model) {
        this.model = model;
        this.graphics = new Graphics();
        this.draw();
    }

    draw() {
        const blockSize = 40 * PIXEL;
        const padding = 2 * PIXEL;
        const x = 10 * PIXEL + this.model.x * blockSize;
        const y = 43 * PIXEL + this.model.y * blockSize;

        this.graphics.beginFill(this.model.color)
            .drawRect(x + padding, y + padding, (blockSize - 2 * padding), (blockSize - 2 * padding), 5)
            .endFill();

        app.stage.addChild(this.graphics);
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);
            // Optional: You can destroy the graphics object to free up memory
            this.graphics.destroy();
        }
    }
}
