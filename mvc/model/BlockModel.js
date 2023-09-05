export class BlockModel {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
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

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setColor(color) {
        this.color = color;
    }

    incrementX(value) {
        this.x += value;
    }

    incrementY(value) {
        this.y += value;
    }
}
