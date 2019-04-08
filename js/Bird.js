class Bird {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.birdImage = new ImageEntity("images/bird.png");
		this.birdFly = new MyAudio("sounds/fly.mp3");
	}

	drawMe(ctx, x = 0, y = 0) {
		this.birdImage.drawMe(ctx, x, y);
	}

	get width() {
		return this.birdImage.width;
	}

	get height() {
		return this.birdImage.height;
	}

	flyUp() {
		this.y -=30;
		this.birdFly.playMe();
	}
}