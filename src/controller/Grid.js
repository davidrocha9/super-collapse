import { COLORS, rng, BLACK } from '../constants/constants.js';
import { Block } from './Block.js';
import { UpcomingBlock } from './UpcomingBlock.js';
import { GridModel } from '../model/GridModel.js';
import { GridView } from '../view/GridView.js';
import { Bomb } from './Bomb.js';

export class Grid {
    constructor(handleBlockClickCallback) {
        this.model = new GridModel((element) => this.handleClick(element));
        this.view = new GridView(this.model);
        this.randomBlockList = [];
        this.randomBlockTimer = null;
        this.handleBlockClickCallback = handleBlockClickCallback;

        this.draw();
    }

    clear() {
        for (let x = 0; x < this.model.getCols(); x++) {
            for (let block of this.model.getCol(x)) {
                if (block != null)
                    block.delete();
            }
        }

        for (let block of this.randomBlockList) {
            block.delete();
        }
    }

    draw() {
        this.view.draw();
    }
    
    getModel() {
        return this.model;
    }

    handleClick = (element) => {
        if (element instanceof Block) {
            const group = this.findAdjacentBlocks(element);

            if (group.length > 2) {
                this.collapseBlocks(group);

                if (typeof this.handleBlockClickCallback === 'function') {
                    this.handleBlockClickCallback(group);
                }
            }
        }
        else if (element instanceof Bomb) {
            const group = this.destroyBlocksInRadius(element.getX(), element.getY(), 2);

            if (typeof this.handleBlockClickCallback === 'function') {
                this.handleBlockClickCallback(group);
            }
        }
    }

    destroyBlocksInRadius(x, y, radius) {
        const group = [];

        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                const newX = x + i;
                const newY = y + j;
    
                if (newX >= 0 && newX < this.model.getCols() && newY >= 0 && newY < this.model.getRows()) {
                    const block = this.model.getBlock(newX, newY);
                    
                    if (block != null) {
                        group.push(block);
                        block.delete();
                        this.deleteBlock(block);
                    }
                }
            }
        }

        this.checkGravity();

        this.checkEmptyCols();

        return group;
    }

    findAdjacentBlocks(block) {
        const color = block.getColor();
        const visited = new Set();
        const group = [];
    
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ];
    
        const dfs = (x, y) => {
            if (x < 0 || x >= this.model.getCols() || y < 0 || y >= this.model.getRows()) {
                return;
            }
    
            const currentBlock = this.model.getBlock(x, y);
    
            if (currentBlock && currentBlock.getColor() === color && !visited.has(currentBlock)) {
                visited.add(currentBlock);
                group.push(currentBlock);
    
                for (const direction of directions) {
                    const newX = x + direction.x;
                    const newY = y + direction.y;
                    dfs(newX, newY);
                }
            }
        };
    
        dfs(block.getX(), block.getY());
    
        return group;
    }
    
    collapseBlocks(group) {
        for (let block of group) {
            block.delete();
            this.deleteBlock(block);
        }

        this.checkGravity();

        this.checkEmptyCols();
    }

    checkGravity() {
        for (let x = this.model.getCols() - 1; x >= 0; x--) {
            for (let y = this.model.getRows() - 1; y >= 0; y--) {
                const currentBlock = this.model.getBlock(x, y);

                if (currentBlock === null) {
                    for (let i = y - 1; i >= 0; i--) {
                        const blockAbove = this.model.getBlock(x, i);
                        if (blockAbove !== null) {
                            const distance = y - i;
                            blockAbove.applyGravity(distance);
                            this.model.grid[x][y] = this.model.grid[x][i];
                            this.model.grid[x][i] = null;
                            blockAbove.getModel().setY(y);
                            blockAbove.getModel().setX(x);
                            break;
                        }
                    }
                }

            }
        }
    }

    deleteBlock(block) {
        this.model.deleteBlock(block.getX(), block.getY());
    }

    checkPossibleMoves() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows - 1; y++) {
                if (this.grid[x][y] != null){
                    const group = this.findAdjacentBlocks(this.grid[x][y]);
                    if (group.length > 2)
                        return true;
                }
            }
        }
        return false;
    }

    addRandomBlockToList() {
        if (this.randomBlockList.length < this.model.getCols()) {
            var randomColor = null;
            if (rng() <= 0.05) {
                randomColor = BLACK;
            }
            else {
                randomColor = COLORS[Math.floor(rng() * 1000 % 3) + 1];
            }

            const randomBlock = new UpcomingBlock(this.randomBlockList.length, 16, randomColor);
                this.randomBlockList.push(randomBlock);

            return 0;
        } else {
            for (let block of this.randomBlockList) {
                block.delete();
            }

            let temp = [];
            for (let x = 0; x < this.model.getCols(); x++) {
                temp.push(this.model.getBlock(x, 0));
            }
    
            if (!temp.every(value => value === null))
                return -1;

            for (let x = 0; x < this.model.getCols(); x++) {
                for (let y = 0; y < this.model.getRows(); y++) {
                    if (this.model.getBlock(x, y) != null) {
                        this.model.getBlock(x, y).moveUp();
                    }
                }   

                this.model.getGrid()[x].shift();   

                if (this.randomBlockList[x].getColor() != BLACK)
                    this.model.pushBlock(x, 15, this.randomBlockList[x].getColor());
                else
                    this.model.pushBomb(x, 15, BLACK);
            }

            this.randomBlockList = [];

            return 1;
        }
    }           
    
    checkValidHalf(cols) {
        let found = false;

        for (let x = 0; x < cols.length; x++) {
            if (!cols[x].every(value => value === null)) {
                found = true;
            }
            else {
                if (cols[x].every(value => value === null) && found)
                    return false; 
            }
        }

        return true;
    }

    checkEmptyCols() {
        while(true) {
            this.checkAndHandleEmptyColsLeft();
            if(this.checkValidHalf(this.model.getGrid().slice(0, 6))) break;
        }

        while(true) {
            this.checkAndHandleEmptyColsRight();
            if (this.checkValidHalf(this.model.getGrid().slice(this.model.getCols() - 6, this.model.getCols()).reverse())) break;
        }
    }
    
    checkAndHandleEmptyColsLeft() {
        for (let x = 5; x > 0; x--) {
            if (this.model.getGrid()[x].every(value => value === null)) {
                let temp = this.model.getGrid()[x]
                this.model.getGrid()[x] = this.model.getGrid()[x-1];
                this.model.getGrid()[x-1] = temp;
                
                for (let y = 0; y < this.model.getRows(); y++) {
                    if (this.model.getGrid()[x][y] != null){
                        this.model.getGrid()[x][y].slide(1);
                    }
                }
            }
        }
    }
    
    checkAndHandleEmptyColsRight() {
        while(true) {
            for (let x = this.model.getCols() - 6; x < this.model.getCols() - 1; x++) {
                if (this.model.getGrid()[x].every(value => value === null)) {
                    let temp = this.model.getGrid()[x]
                    this.model.getGrid()[x] = this.model.getGrid()[x+1];
                    this.model.getGrid()[x+1] = temp;
                    
                    for (let y = 0; y < this.model.getRows(); y++) {
                        if (this.model.getGrid()[x][y] != null){
                            this.model.getGrid()[x][y].slide(-1);
                        }
                    }
                }
            }

            if (this.checkValidHalf(this.model.getGrid().slice(this.model.getCols() - 6, this.model.getCols()).reverse())) break;
        }
    }
}