import { Game } from './Game.js';
import { Settings } from './Settings.js';
import { MenuView } from '../view/MenuView.js';

export class Menu {
    constructor() {
        this.view = new MenuView(this.startNewGame.bind(this), this.showSettings.bind(this));
        this.level = 1;
        this.game = null;
        this.settings = null;
    }

    startNewGame() {
        this.game = new Game(this.level, () => this.reset());
    }

    showSettings() {
        this.settings = new Settings((level) => this.updateLevel(level));
    }

    reset() {
        this.view.draw();
    }

    updateLevel(level) {
        console.log(level);
        this.level = level;
        console.log(this.level);
        this.view.draw();
    }
}
