import { app, Graphics, PIXEL } from '../../display.js';
import { writePlaceholder, scoreStyle, superStyle, collapseStyle } from '../../constants.js';

export class MenuView {
    constructor(startNewGameCallback, showSettingsCallback) {
        this.menuElements = [];
        this.startNewGameCallback = startNewGameCallback;
        this.showSettingsCallback = showSettingsCallback;
        this.draw();
    }

    draw() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.menuElements.push(whiteBlock);

        const superText = new PIXI.Text('Super', superStyle);
        superText.x = 380*PIXEL;
        superText.y = 200*PIXEL;
        app.stage.addChild(superText);
        this.menuElements.push(superText);
        
        const placeholders = writePlaceholder("COLLAPSE!", 350*PIXEL, 280*PIXEL, collapseStyle, 22.5, 1, 1.75);

        for (const placeholder of placeholders) {
            this.menuElements.push(placeholder);
        }

        let play = new PIXI.Text("PLAY", scoreStyle);
        play.x = 412.5 * PIXEL;
        play.y = 410 * PIXEL;
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
        settings.x = 380 * PIXEL;
        settings.y = 470 * PIXEL;
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
    }
}