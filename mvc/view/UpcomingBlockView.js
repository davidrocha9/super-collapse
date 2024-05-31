import { app, Graphics, GAME_WIDTH, GAME_HEIGHT } from '../../display.js';
import { PIXEL, BLACK } from '../../constants.js';

export class UpcomingBlockView {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.graphics = new Graphics();
        this.graphics = new Graphics();
        this.draw();
    }

    draw() {
        if (this.color != BLACK) {
            const XCoord = 0.013 * GAME_WIDTH + this.x * 0.0435 * GAME_WIDTH;
            const YCoord = 0.0485 * GAME_HEIGHT + this.y * 0.04375 * GAME_WIDTH;
            this.graphics.beginFill(this.color)
                .drawRoundedRect(XCoord, YCoord,
                    0.0415 * GAME_WIDTH, 0.0415 * GAME_WIDTH, 0)
                .endFill();
                
            app.stage.addChild(this.graphics);
        }
        else {
            const XCoord = 0.034 * GAME_WIDTH + this.x * 0.0435 * GAME_WIDTH;
            const YCoord = 0.075 * GAME_HEIGHT + this.y * 0.04375 * GAME_WIDTH;
            this.graphics.beginFill(this.color)
                .drawCircle(XCoord, YCoord,
                    0.02 * GAME_WIDTH)
                .endFill();
                
            app.stage.addChild(this.graphics);
        }
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);

            this.graphics.destroy();
        }

        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);

            this.graphics.destroy();
        }
    }
}
