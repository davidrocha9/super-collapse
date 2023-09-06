import { app, PIXEL } from '../../display.js';
import { scoreStyle, drawLogo, drawBlocks  } from '../../constants.js';


export class SettingsView {
    constructor(chooseLevelCallback) {
        this.settingsElements = [];
        this.chooseLevelCallback = chooseLevelCallback;
        this.draw();
    }

    draw() {
        const logoElements = drawLogo(340, 225);
        
        for (const element of logoElements) {
            this.settingsElements.push(element);
        }

        let easy = new PIXI.Text("EASY", scoreStyle);
        easy.x = 425 * PIXEL;
        easy.y = 380 * PIXEL;
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
        medium.x = 400 * PIXEL;
        medium.y = 440 * PIXEL;
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
        hard.x = 420 * PIXEL;
        hard.y = 500 * PIXEL;
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

        drawBlocks();
    }
}