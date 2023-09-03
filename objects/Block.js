import { app, Graphics } from '../display.js';
import { PIXEL } from '../constants.js';

export class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        // Create the block graphics object
        this.graphics = new Graphics();
        this.graphics.interactive = true; // Make the object interactive
        this.graphics.buttonMode = true; // Change cursor to pointer on hover

        // Draw the block
        this.draw();
    }

    draw() {
        const x = 10 * PIXEL + this.x * 40 * PIXEL;
        const y = 40 * PIXEL + this.y * 40 * PIXEL;

        const padding = 2 * PIXEL; // Define the padding value

        this.graphics.beginFill(this.color)
            .drawRoundedRect(x + padding, y + padding, (40 - 2 * padding) * PIXEL, (40 - 2 * padding) * PIXEL, 5)
            .endFill();

        // Add the block to the stage
        app.stage.addChild(this.graphics);
    }

    updatePosition(drop) {
        const newY = this.y + drop;
        
        // Define the animation duration (in milliseconds)
        const animationDuration = 500; // 0.5 seconds
    
        // Calculate the amount to move on each frame
        const deltaY = (newY - this.y) / (animationDuration / 16); // 16ms per frame
    
        // Create a function to update the block's position on each frame
        const animate = () => {
            if (Math.abs(this.y - newY) > Math.abs(deltaY)) {
                this.y += deltaY;
                this.graphics.y += 40 * deltaY * PIXEL;
                requestAnimationFrame(animate);
            } else {
                // Animation has completed, update the block's position and log the new coordinates
                this.y = newY;
                console.log("New coords: " + this.x + ", " + this.y);
            }
        };
    
        // Start the animation loop
        animate();
    }    
}
