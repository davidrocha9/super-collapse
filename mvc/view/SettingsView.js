import { app, PIXEL, GAME_WIDTH, GAME_HEIGHT } from '../../display.js';
import { scoreStyle, drawLogo, drawBlocks  } from '../../constants.js';


export class SettingsView {
    constructor(chooseLevelCallback) {
        this.settingsElements = [];
        this.chooseLevelCallback = chooseLevelCallback;
        this.draw();
    }

    draw() {
        const logoElements = drawLogo(0.475 * GAME_WIDTH, 0.325 * GAME_HEIGHT);
        
        for (const element of logoElements) {
            this.settingsElements.push(element);
        }

        let easy = new PIXI.Text("EASY", scoreStyle);
        easy.x = 0.5 * GAME_WIDTH - easy.width / 2;
        easy.y = 0.5 * GAME_HEIGHT;
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
        medium.x = 0.5 * GAME_WIDTH - medium.width / 2;
        medium.y = 0.575 * GAME_HEIGHT;
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
        hard.x = 0.5 * GAME_WIDTH - hard.width / 2;
        hard.y = 0.65 * GAME_HEIGHT;
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