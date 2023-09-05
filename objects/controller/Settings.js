import { SettingsView } from '../view/SettingsView.js';

export class Settings {
    constructor(chooseLevelCallback) {
        this.view = new SettingsView((level) => this.chooseLevel(level));
        this.level = 1;
        this.chooseLevelCallback = chooseLevelCallback;
    }

    chooseLevel(level) {
        this.level = level;
        this.chooseLevelCallback(this.level);
        console.log("aqui");
    }

    draw() {
        this.view.draw();
    }
}
