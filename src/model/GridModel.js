import { Block } from '../controller/Block.js';
import { Bomb } from '../controller/Bomb.js';
import { COLORS, rng } from '../constants/constants.js';

export class GridModel {
    constructor(handleBlock, handleBomb) {
        this.rows = 16;
        this.cols = 12;
        this.grid = [];
        this.handleBlock = handleBlock;
        this.handleBomb = handleBomb;    

        for (let x = 0; x < this.cols; x++) {
            const column = [];
            for (let y = 0; y < this.rows; y++) {
                if (y >= this.rows - 4) {
                    const block = new Block(x, y, COLORS[Math.floor(rng() * 1000 % 3) + 1], (x, y) => this.handleClick(x, y));
                    column.push(block);
                } else {
                    column.push(null);
                }
            }

            this.grid.push(column);
        }
    }

    handleClick = (x, y) => {
        this.handleBlock(this.grid[x][y]);
    }

    pushBlock(x, y, color) {
        const block = new Block(x, y, color, (x, y) => this.handleClick(x, y));
        this.grid[x].push(block);
    }

    pushBomb(x, y, color) {
        const bomb = new Bomb(x, y, color, (x, y) => this.handleClick(x, y));
        this.grid[x].push(bomb);
    }

    getGrid() {
        return this.grid;
    }

    getRows() {
        return this.rows;
    }

    getCols() {
        return this.cols;
    }

    getCol(x) {
        return this.grid[x];
    }

    getBlock(x, y) {
        return this.grid[x][y];
    }

    setBlock(x, y, block) {
        if (block == null) return;
        this.grid[x][y] = block;
        this.grid[x][y].getModel().setX(x);
        this.grid[x][y].getModel().setY(y);
    }

    getBlockList() {
        return this.randomBlockList;
    }
    
    deleteBlock(x, y) {
        this.grid[x][y] = null;
    }
}