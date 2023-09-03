import { COLORS, rng } from '../constants.js';
import { Block } from './Block.js';

export class Grid {
    constructor() {
        this.rows = 16;
        this.cols = 12;
        this.grid = [];

        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.cols; x++) {
                if (y >= this.rows - 4) {
                    const block = new Block(x, y, COLORS[Math.floor(rng() * (3 - 1 + 1)) + 1]);
                    
                    block.graphics.on('pointerdown', () => {
                        this.handleBlockClick(block);
                    });
                    row.push(block);
                } else {
                    row.push(null);
                }
            }
            // Add the row to the grid
            this.grid.push(row);
        }

        this.draw();
    }

    draw() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x] !== null)
                    this.grid[y][x].draw();
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

            const currentBlock = this.grid[y][x];

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
                this.grid[block.y][block.x] = null;
            }
        }

        for (let x = this.rows - 1; x >= 0; x--) {
            for (let y = this.cols - 1; y >= 0; y--) {
                if (this.grid[x][y] == null) {
                    for (let i = x - 1; i >= 0; i--) {
                        if (this.grid[i][y] != null) {
                            console.log(i)
                            this.grid[i][y].updatePosition(x-i);
                            this.grid[x][y] = this.grid[i][y];
                            this.grid[i][y] = null;
                            break;
                        }
                    }
                }
            }
        }

        console.log(this.grid)
    }
    
    applyGravity() {
        for (let x = this.cols - 1; x >= 0; x--) {
            for (let y = this.rows - 1; y >= 0; y--) {
                if (y < 15 && this.grid[y][x] !== null) {
                    if (this.grid[y + 1][x] === null) {
                        console.log("Block at col " + x + " row " + y + " falls")
                        let newY = y + 1;
                        while (newY < 15 && this.grid[newY + 1][x] === null) {
                            newY++;
                        }
                        
                        this.grid[y][x].updatePosition(newY - y);
                        this.grid[newY][x] = this.grid[y][x];
                        this.grid[y][x] = null;
                        this.grid = this.grid;
                    }
                }
            }
        }
        console.log(this.grid)
    }
    
}
