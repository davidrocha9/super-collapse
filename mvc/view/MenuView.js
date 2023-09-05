import { app, Graphics, PIXEL } from '../../display.js';
import { PADDING, COLORS, rng, writePlaceholder, scoreStyle, superStyle, collapseStyle, drawLogo, drawBlocks  } from '../../constants.js';

export class MenuView {
    constructor(startNewGameCallback, showSettingsCallback) {
        this.menuElements = [];
        this.startNewGameCallback = startNewGameCallback;
        this.showSettingsCallback = showSettingsCallback;
        this.draw();
    }
    
    draw() {
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
        blueBlock.beginFill(0x0000ff)
            .lineStyle(1, 0x000000, 1)
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