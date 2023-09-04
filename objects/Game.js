import { COLORS, rng, scoreStyle, PIXEL } from '../constants.js';
import { Block } from './Block.js';
import { app, Graphics } from '../display.js';
import { UpcomingBlock } from './UpcomingBlock.js';
import { Grid } from './Grid.js';

export class Game {
    constructor() {
        this.grid = new Grid(this.handleBlockClick.bind(this));
        this.randomBlockList = [];
        this.randomBlockTimer = null;

        this.score = new PIXI.Text("0", scoreStyle);
        this.score.x = 625 * PIXEL;
        this.score.y = 205 * PIXEL;
        app.stage.addChild(this.score);

        this.level = new PIXI.Text("1", scoreStyle);
        this.level.x = 625 * PIXEL;
        this.level.y = 305 * PIXEL;
        app.stage.addChild(this.level);

        this.linesleft = new PIXI.Text("100", scoreStyle);
        this.linesleft.x = 610 * PIXEL;
        this.linesleft.y = 405 * PIXEL;
        app.stage.addChild(this.linesleft);
        
        this.startRandomBlockTimer();
    }
    
    handleBlockClick(group) {
        let score = 3 + (group.length - 3) * 3;

        this.updateScore(score);

        if (parseInt(this.linesleft.text) == 0) {
            if (!this.grid.checkPossibleMoves()){
                this.win();
            }
        }
    }

    updateScore(score) {
        const newScore = parseInt(this.score.text) + score;
        const numberOfDigits = newScore.toString().length - this.score.text.toString().length; // Convert the score to a string
        this.score.text = parseInt(this.score.text) + score;

        this.score.x -= numberOfDigits * 5 * numberOfDigits * PIXEL;
    }

    startRandomBlockTimer() {
        if (!this.randomBlockTimer) {
            this.randomBlockTimer = setInterval(() => {
                this.lineCreator()
            }, 50);
        }
    }

    lineCreator() {
        const result = this.grid.addRandomBlockToList()
        if (result == 1)
        {
            if (parseInt(this.linesleft.text) != 0) {
                let changeDigits = (parseInt(this.linesleft.text)).toString().length - (parseInt(this.linesleft.text) - 1).toString().length;
                
                if (parseInt(this.linesleft.text) - 1 < 10) {
                    this.linesleft.text = "  " + (parseInt(this.linesleft.text) - 1) + "  ";
                }
                else this.linesleft.text = " " + (parseInt(this.linesleft.text) - 1) + " ";

                if (changeDigits) {
                    this.linesleft.x += changeDigits * 5 * PIXEL;
                }
            }
        }
        else if (result == -1) {
            this.lose();
        }
    }

    lose() {
        clearInterval(this.randomBlockTimer);
        console.log(this.grid.grid)
        this.grid.grid.forEach(row => {
            row.forEach(block => {
                if (block != null){
                    block.interactive = false;
                    block.graphics.off('pointerdown');
                }
            });
        });

        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);

        let youWonPlaceholder = new PIXI.Text("YOU WON!", scoreStyle);
        youWonPlaceholder.x = 185 * PIXEL;
        youWonPlaceholder.y = 310 * PIXEL;
        app.stage.addChild(youWonPlaceholder);
    }

    win() {
        clearInterval(this.randomBlockTimer);
        console.log(this.grid.grid)
        this.grid.grid.forEach(row => {
            row.forEach(block => {
                if (block != null){
                    block.interactive = false;
                    block.graphics.off('pointerdown');
                }
            });
        });

        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);

        let youWonPlaceholder = new PIXI.Text("YOU WON!", scoreStyle);
        youWonPlaceholder.x = 185 * PIXEL;
        youWonPlaceholder.y = 310 * PIXEL;
        app.stage.addChild(youWonPlaceholder);
    }
}