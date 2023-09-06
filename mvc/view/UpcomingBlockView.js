
import { app, Graphics } from '../../display.js';
import { PIXEL, BLACK } from '../../constants.js';

export class UpcomingBlockView {
    constructor(model) {
        this.model = model;
        this.graphics = new Graphics();
        this.circleGraphics = new Graphics();
        this.draw();
    }

    draw() {
        if (this.model.getColor() != BLACK) {
            const blockSize = 40 * PIXEL;
            const padding = 2 * PIXEL;
            const x = 10 * PIXEL + this.model.x * blockSize;
            const y = 43 * PIXEL + this.model.y * blockSize;

            this.graphics.beginFill(this.model.color)
                .drawRect(x + padding, y + padding, (blockSize - 2 * padding), (blockSize - 2 * padding), 5)
                .endFill();

            app.stage.addChild(this.graphics);
        }
        else {
            const blockSize = 40 * PIXEL;
            const padding = 2 * PIXEL;
            const x = 10 * PIXEL + this.model.x * blockSize;
            const y = 43 * PIXEL + this.model.y * blockSize;
        
            this.graphics.beginFill(this.model.color)
                .drawRect(this.model.x * 40 * PIXEL + 33 * PIXEL, this.model.y * 40 - 3 * PIXEL, 10 * PIXEL, 10 * PIXEL, 5)
                .endFill();

            this.circleGraphics.beginFill(0x000000);
            this.circleGraphics.drawCircle(this.model.x * 40 * PIXEL + 30 * PIXEL, this.model.y * 40 * PIXEL + 65 * PIXEL, 15 * PIXEL);
            this.circleGraphics.endFill();

            this.graphics.pivot.set(x, y);
            this.graphics.position.set(x, y);

            this.graphics.rotation = 0.75;

            app.stage.addChild(this.graphics);
            app.stage.addChild(this.circleGraphics);
        }
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);

            this.graphics.destroy();
        }

        if (this.circleGraphics.parent) {
            this.circleGraphics.parent.removeChild(this.circleGraphics);

            this.circleGraphics.destroy();
        }
    }
}
