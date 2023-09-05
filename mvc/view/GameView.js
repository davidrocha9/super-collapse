import { app, Graphics, PIXEL, RATIO } from '../../display.js';
import { hudStyle, scoreStyle, backToMenuStyle, writePlaceholder, gradientTexture, createGradientTexture } from '../../constants.js';

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

    showLossScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(0xff9b00)
            .drawRoundedRect(130 * PIXEL, 280 * PIXEL, 240 * PIXEL, 160 * PIXEL)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.elements.push(whiteBlock)

        let youWonPlaceholder = new PIXI.Text("GAME OVER!", scoreStyle);
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

    draw() {
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
        const hudTexture = createGradientTexture(0, 0, app.renderer.width, app.renderer.height, '#ffc300', '#ffaa00');

        // draw red line rectangle
        const hud = new Graphics();
        hud.beginFill(0xffffff)
            .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL)
            .endFill();

        // new circle and append to hud
        const circle = new Graphics();
        circle.beginTextureFill({ texture: hudTexture })
            .lineStyle(3, 0xfef392, 1)
            .drawCircle(100*PIXEL, 300*PIXEL, 700*PIXEL, 700*PIXEL)
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

        const scoreRect = new Graphics();
        scoreRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 200*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(scoreRect);
        this.elements.push(scoreRect);

        writePlaceholder('SCORE', 595*PIXEL, 180*PIXEL, hudStyle, 15, 1, 1);

        const levelRect = new Graphics();
        levelRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 300*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(levelRect);
        this.elements.push(levelRect);

        writePlaceholder('LEVEL', 595*PIXEL, 280*PIXEL, hudStyle, 15, 1, 1);

        const linesLeftRect = new Graphics();
        linesLeftRect.beginFill(0xffffff)
            .lineStyle(3, 0xfef392, 1)
            .drawRoundedRect(550*PIXEL, 400*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(linesLeftRect);
        this.elements.push(linesLeftRect);

        writePlaceholder('LINES LEFT', 560*PIXEL, 380*PIXEL, hudStyle, 15, 1, 1);

        const superStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: 0.5,
            dropShadowBlur: 4,
            dropShadowDistance: 2,
            fill: "#fff59a",
            fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
            fontSize: RATIO *  50,
            fontStyle: "italic",
            fontWeight: "bold",
            letterSpacing: 3,
            strokeThickness: 2
        });
        const superText = new PIXI.Text('Super', superStyle);
        superText.x = 570*PIXEL;
        superText.y = 0;
        app.stage.addChild(superText);
        this.elements.push(superText);

        const collapseStyle = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAlpha: 0.75,
            dropShadowAngle: -1.5,
            dropShadowBlur: 4,
            dropShadowColor: "#ffffff",
            fill: "#ffffff",
            fontFamily: "Arial Black",
            fontSize: RATIO *  30,
            fontWeight: "bold",
            strokeThickness: 3
        });

        writePlaceholder("COLLAPSE!", 545*PIXEL, 80*PIXEL, collapseStyle, 22.5, 1, 1.75);

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
        this.elements.push(this.linesleft)
    }

    createGradientTexture(x1, y1, x2, y2, color1, color2) {
        const canvas = document.createElement('canvas');
        canvas.width = app.renderer.width;
        canvas.height = app.renderer.height;
        const ctx = canvas.getContext('2d');
      
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
      
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        return PIXI.Texture.from(canvas);
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