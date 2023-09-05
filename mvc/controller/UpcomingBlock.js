import { app, Graphics } from '../../display.js';
import { PIXEL } from '../../constants.js';
import { UpcomingBlockModel } from '../model/UpcomingBlockModel.js';
import { UpcomingBlockView } from '../view/UpcomingBlockView.js';

export class UpcomingBlock {
    constructor(x, y, color) {
        this.model = new UpcomingBlockModel(x, y, color);
        this.view = new UpcomingBlockView(this.model);
    }

    delete() {
        this.view.delete();
    }

    getColor() {
        return this.model.color;
    }

    applyGravity(units) {
        this.model.applyGravity(units);
        this.view.draw();
    }

    slide(units) {
        this.model.slide(units);
        this.view.draw();
    }

    move(unitsX, unitsY) {
        this.model.slide(unitsX);
        this.model.applyGravity(unitsY);
        this.view.draw();
    }
}