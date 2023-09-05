import { BombModel } from '../model/BombModel.js';
import { BombView } from '../view/BombView.js';

export class Bomb {
    constructor(x, y, color, clickCallback) {
        this.model = new BombModel(x, y, color);
        this.view = new BombView(this.model);
        this.handleClick = clickCallback;

        this.view.graphics.on('pointerdown', () => {
            this.handleClick(this.model.x, this.model.y); // Pass x and y as parameters
        });

        this.view.circleGraphics.on('pointerdown', () => {
            this.handleClick(this.model.x, this.model.y); // Pass x and y as parameters
        });
    }

    getModel() {
        return this.model;
    }

    getView() {
        return this.view;
    }

    getX() {
        return this.model.getX();
    }

    getY() {
        return this.model.getY();
    }

    getColor() {
        return this.model.getColor();
    }

    click(x, y) {
        this.handleClick(x, y);
    }

    draw() {
        this.view.draw(this.model.getX(), this.model.getY(), this.model.getColor());
    }

    moveUp() {
        this.model.incrementY(-1);
        this.view.updateY(-1);
    }

    applyGravity(units) {
        this.model.incrementY(units);
        this.view.updateY(units);
    }

    slide(units) {
        this.model.incrementX(units);
        this.view.updateX(units);
    }

    delete() {
        if (this.view.getGraphics().parent) {
            this.view.getGraphics().parent.removeChild(this.view.getGraphics());
            // Optional: You can destroy the graphics object to free up memory
            this.view.getGraphics().destroy();
        }

        if (this.view.getCircleGraphics().parent) {
            this.view.getCircleGraphics().parent.removeChild(this.view.getCircleGraphics());
            // Optional: You can destroy the graphics object to free up memory
            this.view.getCircleGraphics().destroy();
        }
    }
}
