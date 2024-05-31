import { app, GAME_HEIGHT, GAME_WIDTH, Graphics, PIXEL } from '../../display.js';
import { writePlaceholder, scoreStyle, backToMenuStyle, drawIngameLogo, gradientTexture, hudStyle, createGradientTexture, LIGHTBLACK, BACKGROUND, LIGHTYELLOW, WHITE, BLACK, RED, GREEN, BLUE, ORANGE } from '../../constants.js';

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
        .drawRect(0.01 * GAME_WIDTH, 0.05 * GAME_HEIGHT, 0.525 * GAME_WIDTH, 0.925 * GAME_HEIGHT)
        .endFill();

        app.stage.addChild(backgroundGrid);
        this.elements.push(backgroundGrid);

        this.drawUpcomingGrid()

        const gridLine = new Graphics();
        gridLine.lineStyle(2, BLACK, 1)
            .drawRect(0.01 * GAME_WIDTH, 0.05 * GAME_HEIGHT, 0.525 * GAME_WIDTH, 0.925 * GAME_HEIGHT);

        app.stage.addChild(gridLine);
        this.elements.push(gridLine);

        const hudTexture = createGradientTexture(app.renderer.width / 2,
        app.renderer.height,
        app.renderer.width / 2,
        0,'#ffc300', '#ffaa00');

        const hud = new Graphics();
        hud.beginFill(WHITE)
            .drawRect(0.55 * GAME_WIDTH, 0.015 * GAME_HEIGHT, 0.44 * GAME_WIDTH, 0.97 * GAME_HEIGHT)
            .endFill();

        const circle = new Graphics();
        circle.beginTextureFill({ texture: hudTexture })
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawCircle(-0.15 * GAME_WIDTH, 0.25 * GAME_HEIGHT, GAME_WIDTH, 0.1 * GAME_HEIGHT)
            .endFill();
        circle.filters = [new PIXI.filters.BlurFilter(10)];

        const mask = new PIXI.Graphics();
        mask.beginFill(BLACK);
        mask.drawRect(0.55 * GAME_WIDTH, 0.0175 * GAME_HEIGHT, 0.5 * GAME_WIDTH, 0.97 * GAME_HEIGHT);
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
            .drawRect(0.55 * GAME_WIDTH, 0.017 * GAME_HEIGHT, 0.44 * GAME_WIDTH, 0.97 * GAME_HEIGHT);

        app.stage.addChild(hudLine);
        this.elements.push(hudLine);

        const logoElements = drawIngameLogo();
        for (const element of logoElements) {
            this.elements.push(element);
        }

        const scoreRect = new Graphics();
        scoreRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(0.59 * GAME_WIDTH, 0.3 * GAME_HEIGHT, 0.2 * GAME_WIDTH, 0.05 * GAME_HEIGHT, 0.01 * GAME_WIDTH)
            .endFill();

        app.stage.addChild(scoreRect);
        this.elements.push(scoreRect);

        const scorePlaceholders = writePlaceholder('SCORE', 0.65 * GAME_WIDTH, 0.27 * GAME_HEIGHT, hudStyle, 0.014 * GAME_WIDTH, 1, 1);
        for (const placeholder of scorePlaceholders) {
            this.elements.push(placeholder);
        }

        const levelRect = new Graphics();
        levelRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(0.59 * GAME_WIDTH, 0.4 * GAME_HEIGHT, 0.2 * GAME_WIDTH, 0.05 * GAME_HEIGHT, 0.01 * GAME_WIDTH)
            .endFill();

        app.stage.addChild(levelRect);
        this.elements.push(levelRect);

        const levelPlaceholders = writePlaceholder('LEVEL', 0.65 * GAME_WIDTH, 0.37 * GAME_HEIGHT, hudStyle, 0.014 * GAME_WIDTH, 1, 1);
        for (const placeholder of levelPlaceholders) {
            this.elements.push(placeholder);
        }

        const linesLeftRect = new Graphics();
        linesLeftRect.beginFill(WHITE)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(0.59 * GAME_WIDTH, 0.5 * GAME_HEIGHT, 0.2 * GAME_WIDTH, 0.05 * GAME_HEIGHT, 0.01 * GAME_WIDTH)
            .endFill();

        app.stage.addChild(linesLeftRect);
        this.elements.push(linesLeftRect);

        const linesLeftPlaceholders = writePlaceholder('LINES LEFT', 0.615 * GAME_WIDTH, 0.47 * GAME_HEIGHT, hudStyle, 0.014 * GAME_WIDTH, 1, 1);
        for (const placeholder of linesLeftPlaceholders) {
            this.elements.push(placeholder);
        }

        const whiteBlock = new Graphics();
        whiteBlock.beginFill(WHITE)
            .drawRoundedRect(10, 40, 100, 100)
            .endFill();
        
        this.score = new PIXI.Text("0", scoreStyle);
        this.score.x = 0.6775 * GAME_WIDTH;
        this.score.y = 0.305 * GAME_HEIGHT;
        app.stage.addChild(this.score);
        this.elements.push(this.score);

        this.level = new PIXI.Text(this.levelText, scoreStyle);
        this.level.x = 0.6775 * GAME_WIDTH;
        this.level.y = 0.405 * GAME_HEIGHT;
        app.stage.addChild(this.level);
        this.elements.push(this.level);

        this.linesleft = new PIXI.Text("100", scoreStyle);
        this.linesleft.x = 0.665 * GAME_WIDTH;
        this.linesleft.y = 0.505 * GAME_HEIGHT;
        app.stage.addChild(this.linesleft);
        this.elements.push(this.linesleft);

        this.drawFallingBlocks();

        const exitBtn = new Graphics();
        exitBtn.beginFill(LIGHTYELLOW)
            .lineStyle(3, LIGHTYELLOW, 1)
            .drawRoundedRect(0.615 * GAME_WIDTH, 0.6 * GAME_HEIGHT, 0.15 * GAME_WIDTH, 0.075 * GAME_HEIGHT, 0.01 * GAME_WIDTH)
            .endFill();

        exitBtn.interactive = true;
        exitBtn.buttonMode = true;
        exitBtn.on('pointerdown', () => {
            this.exitCallback();
        });

        app.stage.addChild(exitBtn);
        this.elements.push(exitBtn);

        let exitBtnText = new PIXI.Text("EXIT", scoreStyle);
        exitBtnText.x = 0.665 * GAME_WIDTH;
        exitBtnText.y = 0.61 * GAME_HEIGHT;
        app.stage.addChild(exitBtnText);
        this.elements.push(exitBtnText);
    }

    showWinScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(BACKGROUND)
            .drawRoundedRect(0.175 * GAME_WIDTH, 0.4 * GAME_HEIGHT, 0.2 * GAME_WIDTH, 0.125 * GAME_HEIGHT)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.elements.push(whiteBlock)

        let youWonPlaceholder = new PIXI.Text("YOU WON!", scoreStyle);
        youWonPlaceholder.x = 0.21 * GAME_WIDTH;
        youWonPlaceholder.y = 0.41 * GAME_HEIGHT;
        app.stage.addChild(youWonPlaceholder);
        this.elements.push(youWonPlaceholder);

        let nextLevelPlaceholder = new PIXI.Text("BACK TO MENU", backToMenuStyle);
        nextLevelPlaceholder.x = 0.2325 * GAME_WIDTH;
        nextLevelPlaceholder.y = 0.47 * GAME_HEIGHT;
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

        arrow.x = 0.21 * GAME_WIDTH;
        arrow.y = 0.475 * GAME_HEIGHT;
        
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
        const XCoord = 0.895 * GAME_WIDTH + x * 0.0435 * GAME_WIDTH;
        const YCoord = 0.01 * GAME_HEIGHT + y * 0.04375 * GAME_WIDTH;

        block.beginFill(blockColor)
            .lineStyle(1, BLACK, 1)
            .drawRoundedRect(XCoord, YCoord,
                0.0435 * GAME_WIDTH, 0.0435 * GAME_WIDTH, 5)
            .endFill();
        
        app.stage.addChild(block);
        this.elements.push(block);
    }

    drawFallingBlocks() {
        this.drawFallingBlock(1, 1, GREEN);
        this.drawFallingBlock(0, 5.5, WHITE);
        this.drawFallingBlock(1, 7.5, BLUE);
        this.drawFallingBlock(1, 10, GREEN);
        this.drawFallingBlock(0, 10.5, RED);
        this.drawFallingBlock(1, 14.5, WHITE);
        this.drawFallingBlock(1, 15.5, BLUE);
        this.drawFallingBlock(0, 15, RED);
        this.drawFallingBlock(1, 16.5, GREEN);
    }

    showLossScreen() {
        const whiteBlock = new Graphics();
        whiteBlock.beginFill(BACKGROUND)
            .drawRoundedRect(0.175 * GAME_WIDTH, 0.4 * GAME_HEIGHT, 0.2 * GAME_WIDTH, 0.125 * GAME_HEIGHT)
            .endFill();

        app.stage.addChild(whiteBlock);
        this.elements.push(whiteBlock)

        let youWonPlaceholder = new PIXI.Text("GAME OVER!", scoreStyle);
        youWonPlaceholder.x = 0.2 * GAME_WIDTH;
        youWonPlaceholder.y = 0.41 * GAME_HEIGHT;
        app.stage.addChild(youWonPlaceholder);
        this.elements.push(youWonPlaceholder);

        let nextLevelPlaceholder = new PIXI.Text("BACK TO MENU", backToMenuStyle);
        nextLevelPlaceholder.x = 0.2325 * GAME_WIDTH;
        nextLevelPlaceholder.y = 0.47 * GAME_HEIGHT;
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

        arrow.x = 0.21 * GAME_WIDTH;
        arrow.y = 0.475 * GAME_HEIGHT;

        
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
                .drawRect(0.012 * GAME_WIDTH + i * 0.0435 * GAME_WIDTH, 0.9175 * GAME_HEIGHT, 0.0435 * GAME_WIDTH, 0.0435 * GAME_WIDTH)
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