import { COLORS, rng } from './constants.js';
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
        console.log(this.grid)

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
    
    collapseBlocks(group) {
        // Remove the blocks in the group from the grid
        for (const block of group) {
            console.log(block.x, block.y)
            this.grid[block.y][block.x] = null;
        }

        // Remove the blocks in the group from the PIXI container
        for (const block of group) {
            if (block.graphics.parent) {
                block.graphics.parent.removeChild(block.graphics);
            }
        }

        this.draw()

        // Perform the collapse logic
        /*for (let x = 0; x < this.cols; x++) {
            const column = [];
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[y][x] !== undefined) {
                    column.push(this.grid[y][x]);
                }
            }

            // Fill the column with empty blocks (color 0) at the top to maintain the grid size
            while (column.length < this.rows) {
                column.unshift(new Block(x, column.length, 0));
            }

            // Update the column in the grid
            for (let y = 0; y < this.rows; y++) {
                this.grid[y][x] = column[y];
            }
        }*/

        //this.draw();
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
}
