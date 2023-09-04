import { COLORS, rng, scoreStyle, PIXEL } from '../constants.js';
import { Block } from './Block.js';
import { app, Graphics } from '../display.js';
import { UpcomingBlock } from './UpcomingBlock.js';

export class Grid {
    constructor(handleBlockClickCallback) {
        this.rows = 16;
        this.cols = 12;
        this.grid = [];
        this.randomBlockList = [];
        this.randomBlockTimer = null;
        this.handleBlockClickCallback = handleBlockClickCallback;

        for (let x = 0; x < this.cols; x++) {
            const column = [];
            for (let y = 0; y < this.rows; y++) {
                if (y >= this.rows - 4) {
                    const block = new Block(x, y, COLORS[Math.floor(rng() * 1000 % 3) + 1]);
                    block.graphics.on('pointerdown', () => {
                        this.handleBlockClick(block);
                    });
                    column.push(block);
                } else {
                    column.push(null);
                }
            }
            // Add the column to the grid
            this.grid.push(column);
        }

        this.draw();
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
        if (this.randomBlockList.length < this.cols) {
            const randomColor = COLORS[Math.floor(rng() * 1000 % 3) + 1];
            //const randomColor = COLORS[1];
            const randomBlock = new UpcomingBlock(this.randomBlockList.length, 16, randomColor);
            this.randomBlockList.push(randomBlock);

            return 0;
        } else {
            for (let block of this.randomBlockList) {
                if (block.graphics.parent) {
                    block.graphics.parent.removeChild(block.graphics);
                    // Optional: You can destroy the graphics object to free up memory
                    block.graphics.destroy();
                }
            }

            for (let x = 0; x < this.cols; x++) {
                for (let y = 0; y < this.rows; y++) {
                    if (this.grid[x][y] != null) {
                        this.grid[x][y].moveUp();
                    }
                }

                if (this.grid[0].some(block => block !== null)) {
                    return -1;
                }    

               this.grid[x].shift();   

                const block = new Block(x, 15, this.randomBlockList[x].color)
                block.graphics.on('pointerdown', () => {
                    this.handleBlockClick(block);
                });
                this.grid[x].push(block);
            }
            this.randomBlockList = [];

            return 1;
        }
    }

    draw() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[x][y] !== null) {
                    this.grid[x][y].draw();
                }
            }
        }
    }
    
    handleBlockClick(block) {
        console.log(block)
        const group = this.findAdjacentBlocks(block);

        if (group.length > 2) {
            this.collapseBlocks(group);
            // Call the callback function in the Game class
            if (typeof this.handleBlockClickCallback === 'function') {
                this.handleBlockClickCallback(group);
            }
        }
    }
    
    findAdjacentBlocks(block) {
        const color = block.color;
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
            if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
                return;
            }
    
            const currentBlock = this.grid[x][y]; // Adjust row and column indices
    
            // Check if the block is the same color and not visited
            if (currentBlock && currentBlock.color === color && !visited.has(currentBlock)) {
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
        dfs(block.x, block.y);
    
        return group;
    }            

    collapseBlocks(group) {
        for (let block of group) {
            if (block.graphics.parent) {
                block.graphics.parent.removeChild(block.graphics);
                // Optional: You can destroy the graphics object to free up memory
                block.graphics.destroy();
                this.grid[block.x][block.y] = null; // Adjust row and column indices
            }
        }

        this.checkGravity();

        this.checkEmptyCols();

    }

    checkGravity() {
        for (let x = this.cols - 1; x >= 0; x--) {
            for (let y = this.rows - 1; y >= 0; y--) {
                if (this.grid[x][y] == null) {
                    for (let i = y - 1; i >= 0; i--) {
                        if (this.grid[x][i] != null) {
                            this.grid[x][i].applyGravity(y - i);
                            this.grid[x][y] = this.grid[x][i];
                            this.grid[x][i] = null;
                            break;
                        }
                    }
                }
            }
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
        while(true){
            for (let x = 5; x > 0; x--) {
                if (this.grid[x].every(value => value === null)) {
                    let temp = this.grid[x]
                    this.grid[x] = this.grid[x-1];
                    this.grid[x-1] = temp;

                    for (let y = 0; y < this.rows; y++) {
                        if (this.grid[x][y] != null) this.grid[x][y].slide(1);
                    }
                }
            }

            if(this.checkValidHalf(this.grid.slice(0, 6))) break;
        }
        
        while (true) {
            for (let x = this.cols - 6; x < this.cols - 1; x++) {
                if (this.grid[x].every(value => value === null)) {
                    let temp = this.grid[x];
                    this.grid[x] = this.grid[x + 1];
                    this.grid[x + 1] = temp;
        
                    for (let y = 0; y < this.rows; y++) {
                        if (this.grid[x][y] != null) this.grid[x][y].slide(-1); // Slide to the left
                    }
                }
            }

            if (this.checkValidHalf(this.grid.slice(this.cols - 6, this.cols).reverse())) break;
        }
    }
}