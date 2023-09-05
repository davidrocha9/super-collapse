export class GridElement {
    constructor(x, y, color, clickCallback) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.clickCallback = clickCallback;
    }

    getModel() {
        throw new Error('Subclasses must implement getModel()');
    }

    getView() {
        throw new Error('Subclasses must implement getView()');
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getColor() {
        return this.color;
    }

    handleClick(x, y) {
        console.log("siga2");
        this.clickCallback(x, y);
    }

    draw() {
        throw new Error('Subclasses must implement draw()');
    }

    moveUp() {
        throw new Error('Subclasses must implement moveUp()');
    }

    applyGravity(units) {
        throw new Error('Subclasses must implement applyGravity()');
    }

    slide(units) {
        throw new Error('Subclasses must implement slide()');
    }

    delete() {
        throw new Error('Subclasses must implement delete()');
    }
}