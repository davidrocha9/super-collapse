import { app, Graphics, writePlaceholder } from '../../display.js';
import { PIXEL, scoreStyle } from '../../constants.js';

export class MenuView {
    constructor(startNewGameCallback) {
        this.menuElements = [];
        this.startNewGameCallback = startNewGameCallback;
        this.draw();
    }

    draw() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.menuElements.push(whiteBlock);

        const superStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: 0.5,
            dropShadowBlur: 4,
            dropShadowDistance: 2,
            fill: "#fff59a",
            fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
            fontSize: 50,
            fontStyle: "italic",
            fontWeight: "bold",
            letterSpacing: 3,
            strokeThickness: 2
        });
        const superText = new PIXI.Text('Super', superStyle);
        superText.x = 380*PIXEL;
        superText.y = 200*PIXEL;
        app.stage.addChild(superText);
        this.menuElements.push(superText);
        
        const collapseStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAlpha: 0.75,
            dropShadowAngle: -1.5,
            dropShadowBlur: 4,
            dropShadowColor: "#ffffff",
            fill: "#ffffff",
            fontFamily: "Arial Black",
            fontSize: 30,
            fontWeight: "bold",
            strokeThickness: 3
        });
        
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
    }
}