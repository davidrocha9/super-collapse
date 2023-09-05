import { app, Graphics, PIXEL } from '../../display.js';
import { COLORS, rng, writePlaceholder, scoreStyle, backToMenuStyle, drawLogo, gradientTexture, hudStyle, createGradientTexture  } from '../../constants.js';

export class GameView {
    constructor(reset) {
        this.elements = [];
        this.reset = reset;
        this.draw();
    }

    clear() {
        for (const element of this.elements) {
            app.stage.removeChild(element);
        }
    }

    draw() {
        const background = new Graphics();
        background
        .beginFill(0xff9b00)
        .drawRect(0 ,0 , app.renderer.width, app.renderer.height)
        .endFill();

        app.stage.addChild(background);

        const backgroundGrid = new Graphics();
        backgroundGrid
        .beginTextureFill({ texture: gradientTexture })
        .drawRect(10 * PIXEL, 40 * PIXEL, 480 * PIXEL, 640 * PIXEL)
        .endFill();

        app.stage.addChild(backgroundGrid);
        this.elements.push(backgroundGrid);

        this.drawUpcomingGrid()

        const gridLine = new Graphics();
        gridLine.lineStyle(2, 0x000000, 1)
            .drawRect(9*PIXEL, 40*PIXEL, 482*PIXEL, 684*PIXEL);

        app.stage.addChild(gridLine);
        this.elements.push(gridLine);

        // Create a custom gradient texture
        const hudTexture = createGradientTexture(app.renderer.width / 2,
        app.renderer.height,
        app.renderer.width / 2,
        0,'#ffc300', '#ffaa00');

        // draw red line rectangle
        const hud = new Graphics();
        hud.beginFill(0xffffff)
            .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL)
            .endFill();

        // new circle and append to hud
        const circle = new Graphics();
        circle.beginTextureFill({ texture: hudTexture })
            .lineStyle(3, 0xfef392, 1)
            .drawCircle(130*PIXEL, 300*PIXEL, 700*PIXEL, 700*PIXEL)
            .endFill();
        circle.filters = [new PIXI.filters.BlurFilter(10)];

        const mask = new PIXI.Graphics();
        mask.beginFill(0x000000); // Mask color (black)
        mask.drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 700*PIXEL); // Mask position and size
        mask.endFill();

        circle.mask = mask; // Apply the mask to the circle

        app.stage.addChild(hud);
        app.stage.addChild(circle); // Add the circle to the stage
        app.stage.addChild(mask);

        this.elements.push(hud);
        this.elements.push(circle);
        this.elements.push(mask);

        const hudLine = new Graphics();
        hudLine.lineStyle(4, 0xfcf191, 1)
            .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL);

        app.stage.addChild(hudLine);
        this.elements.push(hudLine);

        const logoElements = drawLogo(520, 35);
        for (const element of logoElements) {
            this.elements.push(element);
        }

        const scoreRect = new Graphics();
        scoreRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 200*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(scoreRect);
        this.elements.push(scoreRect);

        const scorePlaceholders = writePlaceholder('SCORE', 595*PIXEL, 180*PIXEL, hudStyle, 15, 1, 1);
        for (const placeholder of scorePlaceholders) {
            this.elements.push(placeholder);
        }

        const levelRect = new Graphics();
        levelRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 300*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(levelRect);
        this.elements.push(levelRect);

        const levelPlaceholders = writePlaceholder('LEVEL', 595*PIXEL, 280*PIXEL, hudStyle, 15, 1, 1);
        for (const placeholder of levelPlaceholders) {
            this.elements.push(placeholder);
        }

        const linesLeftRect = new Graphics();
        linesLeftRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 400*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(linesLeftRect);
        this.elements.push(linesLeftRect);

        const linesLeftPlaceholders = writePlaceholder('LINES LEFT', 560*PIXEL, 380*PIXEL, hudStyle, 15, 1, 1);
        for (const placeholder of linesLeftPlaceholders) {
            this.elements.push(placeholder);
        }

        drawLogo();

        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xffffff)
            .drawRoundedRect(10, 40, 100, 100)
            .endFill();
        
        this.score = new PIXI.Text("0", scoreStyle);
        this.score.x = 625 * PIXEL;
        this.score.y = 205 * PIXEL;
        app.stage.addChild(this.score);
        this.elements.push(this.score);

        this.level = new PIXI.Text("1", scoreStyle);
        this.level.x = 625 * PIXEL;
        this.level.y = 305 * PIXEL;
        app.stage.addChild(this.level);
        this.elements.push(this.level);

        this.linesleft = new PIXI.Text("100", scoreStyle);
        this.linesleft.x = 610 * PIXEL;
        this.linesleft.y = 405 * PIXEL;
        app.stage.addChild(this.linesleft);
        this.elements.push(this.linesleft);

        this.drawFallingBlocks();
    }

    showWinScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.elements.push(whiteBlock)

        let youWonPlaceholder = new PIXI.Text("YOU WON!", scoreStyle);
        youWonPlaceholder.x = 175 * PIXEL;
        youWonPlaceholder.y = 310 * PIXEL;
        app.stage.addChild(youWonPlaceholder);
        this.elements.push(youWonPlaceholder);

        let nextLevelPlaceholder = new PIXI.Text("BACK TO MENU", backToMenuStyle);
        nextLevelPlaceholder.x = 182.5 * PIXEL;
        nextLevelPlaceholder.y = 370 * PIXEL;
        app.stage.addChild(nextLevelPlaceholder);
        this.elements.push(nextLevelPlaceholder);

        let arrow = new Graphics();
        arrow.beginFill(0xffffff)
        .lineStyle(2, 0xe28503, 1)
        .drawPolygon([
            10, 10,
            25, 0,
            25, 20
        ])
        .endFill();

        arrow.x = 150 * PIXEL;
        arrow.y = 375 * PIXEL;

        
        app.stage.addChild(arrow);
        this.elements.push(arrow);

        nextLevelPlaceholder.interactive = true;
        nextLevelPlaceholder.buttonMode = true;
        nextLevelPlaceholder.on('pointerdown', () => {
            for (const element of this.elements) {
                app.stage.removeChild(element);
            }

            this.reset();
        });

        arrow.interactive = true;
        arrow.buttonMode = true;
        arrow.on('pointerdown', () => {
            for (const element of this.elements) {
                app.stage.removeChild(element);
            }

            this.reset();
        });
    }

    drawFallingBlock(x, y, color1, color2, blockColor) {
        let block = new Graphics();
        block.beginFill(blockColor)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(x * PIXEL, (y + 50) * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(block);
        this.elements.push(block);
    }

    drawFallingBlocks() {
        this.drawFallingBlock(835, 40, '#00ff00', '#ffffff', 0x00ff00);

        this.drawFallingBlock(770, 110, '#000000', '#ffffff', 0xffffff);
        
        this.drawFallingBlock(835, 210, '#000000', '#ffffff', 0x0000ff)
        
        //this.drawFallingBlock(835, 330, '#e0ffe0', '#00ff00', 0x0000ff)

        let blueBlock = new Graphics();
        blueBlock.beginFill(0x0000ff)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(835 * PIXEL, 260 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(blueBlock);
        this.elements.push(blueBlock);

        let greenBlock2 = new Graphics();
        greenBlock2.beginFill(0x00ff00)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(835 * PIXEL, 380 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(greenBlock2);
        this.elements.push(greenBlock2);

        let redBlock = new Graphics();
        redBlock.beginFill(0xff0000)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(770 * PIXEL, 430 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(redBlock);
        this.elements.push(redBlock);

        let whiteBlock2 = new Graphics();
        whiteBlock2.beginFill(0xffffff)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(835 * PIXEL, 520 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(whiteBlock2);
        this.elements.push(whiteBlock2);

        let redBlock2 = new Graphics();
        redBlock2.beginFill(0xff0000)
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(835 * PIXEL, 585 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(redBlock2);
        this.elements.push(redBlock2);

        let blueBlock2 = new Graphics();
        blueBlock2.beginFill(COLORS[Math.floor(rng() * 1000 % 3) + 1])
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(765 * PIXEL, 565 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(blueBlock2);
        this.elements.push(blueBlock2);

        let greenBlock3 = new Graphics();
        greenBlock3.beginFill(COLORS[Math.floor(rng() * 1000 % 3) + 1])
            .lineStyle(1, 0x000000, 1)
            .drawRoundedRect(835 * PIXEL, 650 * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(greenBlock3);
        this.elements.push(greenBlock3);
    }

    showLossScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.elements.push(whiteBlock)

        let youWonPlaceholder = new PIXI.Text("GAME OVER!", scoreStyle);
        youWonPlaceholder.x = 165 * PIXEL;
        youWonPlaceholder.y = 310 * PIXEL;
        app.stage.addChild(youWonPlaceholder);
        this.elements.push(youWonPlaceholder);

        let nextLevelPlaceholder = new PIXI.Text("BACK TO MENU", backToMenuStyle);
        nextLevelPlaceholder.x = 182.5 * PIXEL;
        nextLevelPlaceholder.y = 370 * PIXEL;
        app.stage.addChild(nextLevelPlaceholder);
        this.elements.push(nextLevelPlaceholder);

        let arrow = new Graphics();
        arrow.beginFill(0xffffff)
        .lineStyle(2, 0xe28503, 1)
        .drawPolygon([
            10, 10,
            25, 0,
            25, 20
        ])
        .endFill();

        arrow.x = 150 * PIXEL;
        arrow.y = 375 * PIXEL;

        
        app.stage.addChild(arrow);
        this.elements.push(arrow);

        nextLevelPlaceholder.interactive = true;
        nextLevelPlaceholder.buttonMode = true;
        nextLevelPlaceholder.on('pointerdown', () => {
            for (const element of this.elements) {
                app.stage.removeChild(element);
            }

            this.reset();
        });

        arrow.interactive = true;
        arrow.buttonMode = true;
        arrow.on('pointerdown', () => {
            for (const element of this.elements) {
                app.stage.removeChild(element);
            }

            this.reset();
        });
    }

    drawUpcomingGrid() {
        for (let i = 0; i < 12; i++) {
            let upcomingGrid = new Graphics();
            upcomingGrid.beginFill(0x484444)
                .lineStyle(3, 0xfef392, 1)
                .drawRect(10*PIXEL + 40*i*PIXEL, 683*PIXEL, 40*PIXEL, 40*PIXEL)
                .endFill();

            app.stage.addChild(upcomingGrid);
            this.elements.push(upcomingGrid);
        }
    }

    drawUpcomingGrid() {
        for (let i = 0; i < 12; i++) {
            let upcomingGrid = new Graphics();
            upcomingGrid.beginFill(0x484444)
                .lineStyle(3, 0xfef392, 1)
                .drawRect(10*PIXEL + 40*i*PIXEL, 683*PIXEL, 40*PIXEL, 40*PIXEL)
                .endFill();
    
            app.stage.addChild(upcomingGrid);
            this.elements.push(upcomingGrid);
        }
    }
    
    updateLinesLeft(score) {
        const padding = 3 - score.toString().length;
        for (let x = 0; x < padding; x++) {
            this.linesleft.text = " " + score.toString() + " ";
        }
    }
    
    updateScore(score, increase) {
        const padding = (score + increase).toString().length - score.toString().length;
        this.score.text = score + increase;

        if (padding > 0) {
            this.score.x -= 5 * padding;
        }
    }
}