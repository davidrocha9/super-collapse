import { BombModel } from '../model/BombModel.js';
import { BombView } from '../view/BombView.js';
import { GridElement } from './GridElement.js';

export class Bomb extends GridElement {
    constructor(x, y, color, clickCallback) {
        const model = new BombModel(x, y, color);
        const view = new BombView(model);
        super(model, view, clickCallback);
        
        this.view.circleGraphics.on('pointerdown', () => {
            this.handleClick(this.model.x, this.model.y);
        });
    }

    delete() {
        if (this.view.getGraphics().parent) {
            this.view.getGraphics().parent.removeChild(this.view.getGraphics());
            // Custom Bomb deletion logic here
        }

        if (this.view.getCircleGraphics().parent) {
            this.view.getCircleGraphics().parent.removeChild(this.view.getCircleGraphics());
            // Custom Bomb circle deletion logic here
        }
    }
}