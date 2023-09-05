import { COLORS, rng, scoreStyle, PIXEL, backToMenuStyle } from '../../constants.js';
import { Block } from './Block.js';
import { app, Graphics } from '../../display.js';
import { UpcomingBlock } from '../UpcomingBlock.js';
import { Grid } from './Grid.js';
import { GameView } from '../view/GameView.js';

export class Game {
    constructor(resetCallBack) {
        this.view = new GameView(() => this.reset());
        this.grid = new Grid(this.handleBlockClick.bind(this));
        this.gameElements = [];
        this.linesLeft = 100;
        this.score = 0;
        this.resetCallBack = resetCallBack;
        
        this.startRandomBlockTimer();
    }
    
    reset() {
        this.grid.clear();
        this.resetCallBack();
    }

    handleBlockClick(group) {
        let score = 3 + (group.length - 3) * 3;

        this.increaseScore(score);

        if (this.linesLeft <= 0) {
            if (!this.grid.checkPossibleMoves()){
                this.win();
            }
        }
    }

    increaseScore(score) {
        this.view.updateScore(this.score, score);
        this.score += score;
    }

    startRandomBlockTimer() {
        if (!this.randomBlockTimer) {
            this.randomBlockTimer = setInterval(() => {
                this.lineCreator()
            }, 1000);
        }
    }

    lineCreator() {
        const result = this.grid.addRandomBlockToList();

        switch (result) {
            case 1:
                if (this.linesLeft == 0) break;
                this.linesLeft -= 1;
                this.view.updateLinesLeft(this.linesLeft);
                break;
            case -1:
                this.lose();
                break;
            default:
                break;
        }
    }

    lose() {
        clearInterval(this.randomBlockTimer);

        this.grid.getModel().getGrid().forEach(row => {
            row.forEach(block => {
                if (block != null){
                    block.interactive = false;
                    block.getView().getGraphics().off('pointerdown');
                }
            });
        });

        this.view.showLossScreen();
    }

    win() {
        clearInterval(this.randomBlockTimer);

        this.grid.getModel().getGrid().forEach(row => {
            row.forEach(block => {
                if (block != null){
                    block.interactive = false;
                    block.getView().getGraphics().off('pointerdown');
                }
            });
        });

        this.view.showWinScreen();
    }
}