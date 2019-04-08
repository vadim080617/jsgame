class Game {
	constructor(ctx, { gravity = 1.5, bX = 10, bY = 150, gameContainerWidth = 288, gameContainerHeight = 512 } = {}) {
		this.ctx = ctx;
		this.gravity = gravity;
		this.score = 0;
		this.gameContainerWidth = gameContainerWidth;
		this.gameContainerHeight = gameContainerHeight;

		this.bg = new ImageEntity("images/bg.png");
		this.fg = new ImageEntity("images/fg.png");

		this.pipes = [];

		this.pipes.push(new PipeWall(gameContainerWidth,0));

		this.bird = new Bird(bX, bY);

		this.scoreTick = new MyAudio("sounds/score.mp3");

		const gameBirdUp = this.birdUp.bind(this);
		document.addEventListener("keydown", gameBirdUp);
	};

  	set bX (val) {
	    this.bird.x = val;
  	}

    set bY (val) {
	    this.bird.y = val;
  	}

	get bX() {
		return this.bird.x;
	}

	get bY() {
		return this.bird.y;
	}

	drawGame() {
		this.drawFrame();
		requestAnimationFrame( () => {
			this.drawGame() 
		});
	}

	birdUp(){
	  this.bird.flyUp();
	}

	drawFrame() {
		this.bg.drawMe(this.ctx,0,0);
		this.drawPipes();

		this.fg.drawMe(this.ctx, 0, this.gameContainerHeight - this.fg.height)
		this.bird.drawMe(this.ctx, this.bX, this.bY);

		this.useGravity();
		this.drawScore();
	}

	useGravity() {
		this.bY += this.gravity;
	}

	drawPipes() {
		this.pipes.forEach(pipe => {
			pipe.drawMe(this.ctx);
			pipe.x--;
			if(pipe.x == (this.gameContainerWidth - 188)) {
				this.pipes.push(new PipeWall(this.gameContainerWidth, Math.floor(Math.random()*PipeWall.pipeNorth.height) - PipeWall.pipeNorth.height));
			}

			if(this.isBirdFailed(pipe)){
				window.location.reload();
			}

			this.isBirdGoesThroughtPipe(pipe);
		});
	}

	isBirdFailed(pipe) {
		if(this.bX + this.bird.width >= pipe.x 
			&& this.bX <= pipe.x + PipeWall.pipeNorth.width
			&& ( this.bY <= pipe.y + PipeWall.pipeNorth.height 
				|| this.bY + this.bird.height >= pipe.y + pipe.constant)
			|| this.bY + this.bird.height >= this.gameContainerHeight - this.fg.height) {
			return true;
		}
		return false;
	}

	isBirdGoesThroughtPipe(pipe) {
		if(pipe.x == 5){
			this.score++;
			this.scoreTick.playMe();
		}
	}

	drawScore() {
	    this.ctx.fillStyle = "#000";
	    this.ctx.font = "20px Verdana";
	    this.ctx.fillText(`Score : ${this.score}`, 10, this.gameContainerHeight - 20);
	}
}
