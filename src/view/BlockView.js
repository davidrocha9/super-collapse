
import { app, Graphics, GAME_WIDTH, GAME_HEIGHT } from '../constants/display.js';
import { PIXEL, PADDING } from '../constants/constants.js';

export class BlockView {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
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
        const XCoord = 0.0115 * GAME_WIDTH + this.x * 0.0435 * GAME_WIDTH;
        const YCoord = 0.0435 * GAME_HEIGHT + this.y * 0.04375 * GAME_WIDTH;
        this.graphics.beginFill(this.color)
            .drawRoundedRect(XCoord, YCoord,
                0.0435 * GAME_WIDTH, 0.0435 * GAME_WIDTH, 5)
            .endFill();
            
        app.stage.addChild(this.graphics);
    }

    updateX(units) {
        this.graphics.x += units * 0.0435 * GAME_WIDTH;
    }

    updateY(units) {
        this.graphics.y += units * 0.0435 * GAME_WIDTH;
    }

    delete() {
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics);

            this.graphics.destroy();
        }
    }

}
