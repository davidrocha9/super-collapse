import { app, Graphics, PIXEL } from '../../display.js';
import { writePlaceholder, scoreStyle, backToMenuStyle, drawLogo, gradientTexture, hudStyle, createGradientTexture, LIGHTBLACK, BACKGROUND, LIGHTYELLOW, WHITE, BLACK, RED, GREEN, BLUE, ORANGE } from '../../constants.js';

export class GameView {
    constructor(level, reset, exitCallback) {
        this.levelText = level;
        this.elements = [];
        this.reset = reset;
        this.exitCallback = exitCallback;
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
        .beginFill(BACKGROUND)
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
        gridLine.lineStyle(2, BLACK, 1)
            .drawRect(9*PIXEL, 40*PIXEL, 482*PIXEL, 684*PIXEL);

        app.stage.addChild(gridLine);
        this.elements.push(gridLine);

        const hudTexture = createGradientTexture(app.renderer.width / 2,
        app.renderer.height,
        app.renderer.width / 2,
        0,'#ffc300', '#ffaa00');

        const hud = new Graphics();
        hud.beginFill(WHITE)
            .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL)
            .endFill();

        const circle = new Graphics();
        circle.beginTextureFill({ texture: hudTexture })
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawCircle(130*PIXEL, 300*PIXEL, 700*PIXEL, 700*PIXEL)
            .endFill();
        circle.filters = [new PIXI.filters.BlurFilter(10)];

        const mask = new PIXI.Graphics();
        mask.beginFill(BLACK);
        mask.drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 700*PIXEL);
        mask.endFill();

        circle.mask = mask;

        app.stage.addChild(hud);
        app.stage.addChild(circle);
        app.stage.addChild(mask);

        this.elements.push(hud);
        this.elements.push(circle);
        this.elements.push(mask);

        const hudLine = new Graphics();
        hudLine.lineStyle(4, LIGHTYELLOW, 1)
            .drawRect(505*PIXEL, 20*PIXEL, 400*PIXEL, 703*PIXEL);

        app.stage.addChild(hudLine);
        this.elements.push(hudLine);

        const logoElements = drawLogo(520, 35);
        for (const element of logoElements) {
            this.elements.push(element);
        }

        const scoreRect = new Graphics();
        scoreRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(550*PIXEL, 200*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(scoreRect);
        this.elements.push(scoreRect);

        const scorePlaceholders = writePlaceholder('SCORE', 595*PIXEL, 180*PIXEL, hudStyle, 15, 1, 1);
        for (const placeholder of scorePlaceholders) {
            this.elements.push(placeholder);
        }

        const levelRect = new Graphics();
        levelRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(550*PIXEL, 300*PIXEL, 175*PIXEL, 50*PIXEL, 7*PIXEL)
            .endFill();

        app.stage.addChild(levelRect);
        this.elements.push(levelRect);

        const levelPlaceholders = writePlaceholder('LEVEL', 595*PIXEL, 280*PIXEL, hudStyle, 15, 1, 1);
        for (const placeholder of levelPlaceholders) {
            this.elements.push(placeholder);
        }

        const linesLeftRect = new Graphics();
        linesLeftRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
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
        whiteBlock.beginFill(WHITE)
            .drawRoundedRect(10, 40, 100, 100)
            .endFill();
        
        this.score = new PIXI.Text("0", scoreStyle);
        this.score.x = 621 * PIXEL;
        this.score.y = 205 * PIXEL;
        app.stage.addChild(this.score);
        this.elements.push(this.score);

        this.level = new PIXI.Text(this.levelText, scoreStyle);
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

        const exitBtn = new Graphics();
        exitBtn.beginFill(LIGHTYELLOW)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(550*PIXEL, 530*PIXEL, 175*PIXEL, 75*PIXEL, 7*PIXEL)
            .endFill();

        exitBtn.interactive = true;
        exitBtn.buttonMode = true;
        exitBtn.on('pointerdown', () => {
            this.exitCallback();
        });

        app.stage.addChild(exitBtn);
        this.elements.push(exitBtn);

        let exitBtnText = new PIXI.Text("EXIT", scoreStyle);
        exitBtnText.x = 605 * PIXEL;
        exitBtnText.y = 540 * PIXEL;
        app.stage.addChild(exitBtnText);
        this.elements.push(exitBtnText);
    }

    showWinScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(BACKGROUND)
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
        arrow.beginFill(WHITE)
        .lineStyle(2, ORANGE, 1)
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

    drawFallingBlock(x, y, blockColor) {
        let block = new Graphics();
        block.beginFill(blockColor)
            .lineStyle(1, BLACK, 1)
            .drawRoundedRect(x * PIXEL, (y + 50) * PIXEL,
                60 * PIXEL, 60 * PIXEL, 5)
            .endFill();
        
        app.stage.addChild(block);
        this.elements.push(block);
    }

    drawFallingBlocks() {
        this.drawFallingBlock(835, 40, GREEN);
        this.drawFallingBlock(770, 110, WHITE);
        this.drawFallingBlock(835, 210, BLUE);
        this.drawFallingBlock(835, 340, GREEN);
        this.drawFallingBlock(770, 370, RED);
        this.drawFallingBlock(835, 475, WHITE);
        this.drawFallingBlock(770, 520, BLUE);
        this.drawFallingBlock(835, 540, RED);
        this.drawFallingBlock(835, 605, GREEN);
    }

    showLossScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(BACKGROUND)
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
        arrow.beginFill(WHITE)
        .lineStyle(2, ORANGE, 1)
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
            upcomingGrid.beginFill(LIGHTBLACK)
                .lineStyle(3, LIGHTYELLOW, 1)
                .drawRect(10*PIXEL + 40*i*PIXEL, 683*PIXEL, 40*PIXEL, 40*PIXEL)
                .endFill();

            app.stage.addChild(upcomingGrid);
            this.elements.push(upcomingGrid);
        }
    }

    drawUpcomingGrid() {
        for (let i = 0; i < 12; i++) {
            let upcomingGrid = new Graphics();
            upcomingGrid.beginFill(LIGHTBLACK)
                .lineStyle(3, LIGHTYELLOW, 1)
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