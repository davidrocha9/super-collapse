import { app, Graphics, PIXEL, RATIO } from '../../display.js';
import { scoreStyle, writePlaceholder } from '../../constants.js';

export class SettingsView {
    constructor(chooseLevelCallback) {
        this.settingsElements = [];
        this.chooseLevelCallback = chooseLevelCallback;
        this.draw();
    }

    draw() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.settingsElements.push(whiteBlock);

        const superStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: 0.5,
            dropShadowBlur: 4,
            dropShadowDistance: 2,
            fill: "#fff59a",
            fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
            fontSize: RATIO *  50,
            fontStyle: "italic",
            fontWeight: "bold",
            letterSpacing: 3,
            strokeThickness: 2
        });
        const superText = new PIXI.Text('Super', superStyle);
        superText.x = 380*PIXEL;
        superText.y = 200*PIXEL;
        app.stage.addChild(superText);
        this.settingsElements.push(superText);
        
        const collapseStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAlpha: 0.75,
            dropShadowAngle: -1.5,
            dropShadowBlur: 4,
            dropShadowColor: "#ffffff",
            fill: "#ffffff",
            fontFamily: "Arial Black",
            fontSize: RATIO *  30,
            fontWeight: "bold",
            strokeThickness: 3
        });
        
        const placeholders = writePlaceholder("COLLAPSE!", 350*PIXEL, 280*PIXEL, collapseStyle, 22.5, 1, 1.75);

        for (const placeholder of placeholders) {
            this.settingsElements.push(placeholder);
        }

        let easy = new PIXI.Text("EASY", scoreStyle);
        easy.x = 412.5 * PIXEL;
        easy.y = 410 * PIXEL;
        app.stage.addChild(easy);
        this.settingsElements.push(easy);

        easy.interactive = true;
        easy.buttonMode = true;
        easy.on('pointerdown', () => {
            for (const element of this.settingsElements) {
                app.stage.removeChild(element);
            }
    
            this.settingsElements.length = 0;
            
            this.chooseLevelCallback(1);
        });

        let medium = new PIXI.Text("MEDIUM", scoreStyle);
        medium.x = 387.5 * PIXEL;
        medium.y = 470 * PIXEL;
        app.stage.addChild(medium);
        this.settingsElements.push(medium);

        medium.interactive = true;
        medium.buttonMode = true;
        medium.on('pointerdown', () => {
            for (const element of this.settingsElements) {
                app.stage.removeChild(element);
            }
    
            this.settingsElements.length = 0;
            
            this.chooseLevelCallback(2);
        });

        let hard = new PIXI.Text("HARD", scoreStyle);
        hard.x = 410 * PIXEL;
        hard.y = 540 * PIXEL;
        app.stage.addChild(hard);
        this.settingsElements.push(hard);

        hard.interactive = true;
        hard.buttonMode = true;
        hard.on('pointerdown', () => {
            for (const element of this.settingsElements) {
                app.stage.removeChild(element);
            }
    
            this.settingsElements.length = 0;
            
            this.chooseLevelCallback(3);
        });
    }
}