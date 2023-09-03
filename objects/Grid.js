import { COLORS, rng } from '../constants.js';
import { Block } from './Block.js';

export class Grid {
    constructor() {
        this.rows = 16;
        this.cols = 12;
        this.grid = [];
    
        for (let x = 0; x < this.cols; x++) {
            const column = [];
            for (let y = 0; y < this.rows; y++) {
                if (y >= this.rows - 4) {
                    //const block = new Block(x, y, COLORS[Math.floor(rng() * (3 - 1 + 1)) + 1]);
                    const block = new Block(x, y, COLORS[(x % 3) + 1]);
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
        const group = this.findAdjacentBlocks(block);

        if (group.length > 2) {
            this.collapseBlocks(group);
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

        let gridCopy = [];
        // copy grid to gridcopy
        for (let x = 0; x < this.cols; x++) {
            const column = [];
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[x][y] !== null) {
                    column.push(this.grid[x][y]);
                } else {
                    column.push(null);
                }
            }
            // Add the column to the grid
            gridCopy.push(column);
        }

        console.log(gridCopy)

        this.checkEmptyCols();

        /*for (let x = this.cols - 1; x >= 0; x--) {
            for (let y = this.rows - 1; y >= 0; y--) {
                if (this.grid[x][y] == null) {
                    for (let i = y - 1; i >= 0; i--) {
                        if (this.grid[x][i] != null) {
                            this.grid[x][i].applyGravity(y - i); // Adjust row and column indices
                            this.grid[x][y] = this.grid[x][i]; // Adjust row and column indices
                            this.grid[x][i] = null; // Adjust row and column indices
                            break;
                        }
                    }
                }
            }
        }*/
    }

    checkEmptyCols() {
        for (let x = this.cols / 2 - 2; x >= 0; x--) {
            for (let y = this.rows - 1; y >= 0; y--) {
                if (this.grid[x][y] != null) {
                    if (this.grid[x+1][y] == null) {
                        this.grid[x+1][y] = this.grid[x][y];
                        this.grid[x][y] = null;
                        this.grid[x+1][y].slide(1);
                    }
                }
            }
        }

        for (let x = 6; x < this.cols; x++) {
            for (let y = this.rows - 1; y >= 0; y--) {
                if (this.grid[x][y] != null) {
                    if (this.grid[x-1][y] == null) {
                        this.grid[x-1][y] = this.grid[x][y];
                        this.grid[x][y] = null;
                        this.grid[x-1][y].slide(-1);
                    }
                }
            }
        }
    }
}