import { COLORS, rng, scoreStyle, PIXEL } from '../../constants.js';
import { Block } from './Block.js';
import { app, Graphics } from '../../display.js';
import { UpcomingBlock } from './UpcomingBlock.js';
import { GridModel } from '../model/GridModel.js';
import { GridView } from '../view/GridView.js';

export class Grid {
    constructor(handleBlockClickCallback) {
        this.model = new GridModel((block) => this.handleClick(block));
        this.view = new GridView(this.model);
        this.randomBlockList = [];
        this.randomBlockTimer = null;
        this.handleBlockClickCallback = handleBlockClickCallback;

        this.draw();
    }

    clear() {
        // iterate blocks
        for (let x = 0; x < this.model.getCols(); x++) {
            for (let y = 0; y < this.model.getRows(); y++) {
                if (this.model.getBlock(x, y) != null) {
                    this.model.getBlock(x, y).delete();
                }
            }
        }
    }

    draw() {
        this.view.draw();
    }
    
    getModel() {
        return this.model;
    }

    handleClick = (block) => {
        const group = this.findAdjacentBlocks(block);

        if (group.length > 2) {
            this.collapseBlocks(group);
            // Call the Callback function in the Game class
            if (typeof this.handleBlockClickCallback === 'function') {
                this.handleBlockClickCallback(group);
            }
        }
    }

    findAdjacentBlocks(block) {
        const color = block.getColor();
        const visited = new Set(); // Keep track of visited blocks
        const group = []; // Store the group of blocks to be removed
    
        // Define directions (up, down, left, right)
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ];
    
        // Define a recursive DFS function
        const dfs = (x, y) => {
            if (x < 0 || x >= this.model.getCols() || y < 0 || y >= this.model.getRows()) {
                return;
            }
    
            const currentBlock = this.model.getBlock(x, y);
    
            // Check if the block is the same color and not visited
            if (currentBlock && currentBlock.getColor() === color && !visited.has(currentBlock)) {
                visited.add(currentBlock);
                group.push(currentBlock);
    
                // Explore adjacent blocks in all directions
                for (const direction of directions) {
                    const newX = x + direction.x;
                    const newY = y + direction.y;
                    dfs(newX, newY);
                }
            }
        };
    
        // Start DFS from the clicked block's position
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
            const randomColor = COLORS[Math.floor(rng() * 1000 % 3) + 1];
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
            
            // check if temp has any non null values
            if (!temp.every(value => value === null))
                return -1;

            for (let x = 0; x < this.model.getCols(); x++) {
                for (let y = 0; y < this.model.getRows(); y++) {
                    if (this.model.getBlock(x, y) != null) {
                        this.model.getBlock(x, y).moveUp();
                    }
                }   

                this.model.getGrid()[x].shift();   

                this.model.pushBlock(x, 15, this.randomBlockList[x].getColor());
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
    
    shiftColumnLeft(x) {
        for (let y = 0; y < this.model.getRows(); y++) {
            if (this.model.getBlock(x - 1, y) != null) {
                this.model.getBlock(x - 1, y).slide(1);
            }
        }
    
        // Swap columns
        const temp = [...this.model.getGrid()[x]];
        this.model.getGrid()[x] = [...this.model.getGrid()[x - 1]];
        this.model.getGrid()[x - 1] = temp;
    }
    
    shiftColumnRight(x) {
        for (let y = 0; y < this.model.getRows(); y++) {
            if (this.model.getBlock(x + 1, y) != null) {
                this.model.getBlock(x + 1, y).slide(1);
            }
        }
    
        // Swap columns
        const temp = [...this.model.getGrid()[x]];
        this.model.getGrid()[x] = [...this.model.getGrid()[x + 1]];
        this.model.getGrid()[x + 1] = temp;
    }
}