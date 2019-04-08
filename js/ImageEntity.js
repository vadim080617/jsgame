class ImageEntity {
	constructor(path) {
		this.image = new Image();
		this.image.src = path;
	}

	drawMe(ctx, x = 0, y = 0) {
		ctx.drawImage(this.image, x, y);
	}

	get width() {
		return this.image.width;
	}

	get height() {
		return this.image.height;
	}
}