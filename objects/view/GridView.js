// BlockView.js
import { app, Graphics } from '../../display.js';
import { PIXEL } from '../../constants.js';

export class GridView {
    constructor(model) {
        this.model = model;
        this.draw();
    }

    draw() {
        for (let x = 0; x < this.model.getCols(); x++) {
            for (let y = 0; y < this.model.getRows(); y++) {
                if (this.model.getGrid()[x][y] !== null) {
                    this.model.getGrid()[x][y].draw();
                }
            }
        }
    }
}
