export class GridElement {
    constructor(model, view, clickCallback) {
        this.model = model;
        this.view = view;
        this.handleClick = clickCallback;

        this.view.graphics.on('pointerdown', () => {
            this.handleClick(this.model.x, this.model.y);
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
            this.view.getGraphics().destroy();
        }
    }
}