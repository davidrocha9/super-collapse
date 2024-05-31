import { app, GAME_HEIGHT, GAME_WIDTH, Graphics, PIXEL, PIXEL_WIDTH } from '../constants/display.js';
import { scoreStyle, drawLogo, drawBlocks, BLACK, BLUE, BACKGROUND  } from '../constants/constants.js';

export class MenuView {
    constructor(startNewGameCallback, showSettingsCallback) {
        this.menuElements = [];
        this.startNewGameCallback = startNewGameCallback;
        this.showSettingsCallback = showSettingsCallback;
        this.draw();
    }
    
    draw() {
        const logoElements = drawLogo(0.475 * GAME_WIDTH, 0.325 * GAME_HEIGHT);
        
        for (const element of logoElements) {
            this.menuElements.push(element);
        }

        let play = new PIXI.Text("PLAY", scoreStyle);
        play.x = 0.5 * GAME_WIDTH - play.width / 2;
        play.y = 0.5 * GAME_HEIGHT;
        app.stage.addChild(play);
        this.menuElements.push(play);

        play.interactive = true;
        play.buttonMode = true;
        play.on('pointerdown', () => {
            for (const element of this.menuElements) {
                app.stage.removeChild(element);
            }
    
            this.menuElements.length = 0;
            
            this.startNewGameCallback();
        });

        let settings = new PIXI.Text("SETTINGS", scoreStyle);
        settings.x = 0.5 * GAME_WIDTH - settings.width / 2;
        settings.y = 0.575 * GAME_HEIGHT;
        app.stage.addChild(settings);
        this.menuElements.push(settings);

        settings.interactive = true;
        settings.buttonMode = true;
        settings.on('pointerdown', () => {
            for (const element of this.menuElements) {
                app.stage.removeChild(element);
            }

            this.menuElements.length = 0;

            this.showSettingsCallback();
        });

        const blocks = drawBlocks();
        for (const block of blocks) {
            this.menuElements.push(block);
        }
    }
}