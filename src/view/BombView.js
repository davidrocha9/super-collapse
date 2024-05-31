
import { app, Graphics, GAME_WIDTH, GAME_HEIGHT } from '../constants/display.js';
import { PIXEL } from '../constants/constants.js';

export class BombView {
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
        const XCoord = 0.0325 * GAME_WIDTH + this.x * 0.0435 * GAME_WIDTH;
        const YCoord = 0.07 * GAME_HEIGHT + this.y * 0.04375 * GAME_WIDTH;
        this.graphics.beginFill(this.color)
            .drawCircle(XCoord, YCoord,
                0.0215 * GAME_WIDTH)
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