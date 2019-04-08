class MyAudio {
	constructor(path) {
		this.audio = new Audio();
		this.audio.src = path;
	}

	playMe() {
		this.audio.play();
	}
}