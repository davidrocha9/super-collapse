import { BombModel } from '../model/BombModel.js';
import { BombView } from '../view/BombView.js';
import { GridElement } from './GridElement.js';

export class Bomb extends GridElement {
    constructor(x, y, color, clickCallback) {
        const model = new BombModel(x, y, color);
        const view = new BombView(x, y, color);
        super(model, view, clickCallback);
        
        this.view.graphics.on('pointerdown', () => {
            this.handleClick(this.model.x, this.model.y);
        });
    }

    delete() {
        if (this.view.getGraphics().parent) {
            this.view.getGraphics().parent.removeChild(this.view.getGraphics());
        }

        if (this.view.getGraphics().parent) {
            this.view.getGraphics().parent.removeChild(this.view.getGraphics());
        }
    }
}