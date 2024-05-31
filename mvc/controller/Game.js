import { Grid } from './Grid.js';
import { GameView } from '../view/GameView.js';

export class Game {
    constructor(level, resetCallback, exitCallback) {
        this.view = new GameView(level, () => this.reset(), () => this.exit());
        this.grid = new Grid(this.handleBlockClick.bind(this));
        this.gameElements = [];
        this.linesLeft = 100;
        this.score = 0;
        this.level = level;
        this.resetCallback = resetCallback;
        this.exitCallback = exitCallback;
        
        this.startRandomBlockTimer();
    }
    
    reset() {
        this.grid.clear();
        this.view.clear();
        this.resetCallback();
    }

    exit() {
        this.view.clear();
        clearInterval(this.randomBlockTimer)
        this.grid.clear();
        this.exitCallback();
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

    handleBombClick(group) {
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
            }, 1000 / (2 * this.level));
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