import { BlockModel } from '../model/BlockModel.js';
import { BlockView } from '../view/BlockView.js';
import { GridElement } from './GridElement.js';

export class Block extends GridElement {
    constructor(x, y, color, clickCallback) {
        const model = new BlockModel(x, y, color);
        const view = new BlockView(x, y, color);
        super(model, view, clickCallback);
    }
}