export class UpcomingBlockModel {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    applyGravity(units) {
        this.y += units;
    }

    slide(units) {
        this.x += units;
    }
}