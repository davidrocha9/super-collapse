import { Game } from './Game.js';
import { MenuView } from '../view/MenuView.js';


export class Menu {
    constructor() {
        this.view = new MenuView(this.startNewGame.bind(this));
        this.game = null;
    }

    startNewGame() {
        this.game = new Game(() => this.reset());
    }

    reset() {
        this.view.draw();
    }
}