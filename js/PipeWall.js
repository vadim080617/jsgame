class PipeWall {
	static get pipeNorth() {
		return new ImageEntity("images/pipeNorth.png");
	}		
	static get pipeSouth() {
		return new ImageEntity("images/pipeSouth.png");
	}

	static get gap() {
		return 85;
	}

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	drawMe(ctx) {
		this.constructor.pipeNorth.drawMe(ctx, this.x, this.y);
		this.constructor.pipeSouth.drawMe(ctx, this.x, this.y + this.constant);
	}

	get constant() {
		return this.constructor.pipeNorth.height + this.constructor.gap;
	}
}