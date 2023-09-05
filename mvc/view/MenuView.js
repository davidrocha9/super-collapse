import { app, Graphics, PIXEL } from '../../display.js';
import { scoreStyle, drawLogo, drawBlocks, BLACK, BLUE, BACKGROUND  } from '../../constants.js';

export class MenuView {
    constructor(startNewGameCallback, showSettingsCallback) {
        this.menuElements = [];
        this.startNewGameCallback = startNewGameCallback;
        this.showSettingsCallback = showSettingsCallback;
        this.draw();
    }
    
    draw() {
        const background = new Graphics();
        background
        .beginFill(BACKGROUND)
        .lineStyle(1, BLACK, 1)
        .drawRect(282 * PIXEL, 112 * PIXEL, 358 * PIXEL, 478 * PIXEL)
        .endFill();

        app.stage.addChild(background);

        const logoElements = drawLogo(340, 225);
        
        for (const element of logoElements) {
            this.menuElements.push(element);
        }

        let play = new PIXI.Text("PLAY", scoreStyle);
        play.x = 425 * PIXEL;
        play.y = 400 * PIXEL;
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
        settings.x = 390 * PIXEL;
        settings.y = 460 * PIXEL;
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

        let blueBlock = new Graphics();
        blueBlock.beginFill(BLUE)
            .lineStyle(1, BLACK, 1)
            .drawRoundedRect(0 * PIXEL, 0 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();

        app.stage.addChild(blueBlock);
        this.menuElements.push(blueBlock);

        const blocks = drawBlocks();
        for (const block of blocks) {
            this.menuElements.push(block);
        }
    }
}