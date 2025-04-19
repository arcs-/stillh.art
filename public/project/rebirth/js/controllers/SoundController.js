export default class SoundController {
	constructor() {
		this.mainTheme = loadSound('/assets/sounds/mainTheme-RR.mp3')
		this.mainTheme.setVolume(0.65)

		this.creditesTheme = loadSound('/assets/sounds/creditesTheme-RR.mp3')
		this.creditesTheme.setVolume(0.65)

		this.deathSignal = loadSound('/assets/sounds/deathSignal-RR.mp3')
		this.deathSignal.setVolume(1)

		this.beerSound = loadSound('/assets/sounds/beer-RR.mp3')
		this.beerSound.setVolume(0.55)

		this.froggoSound = loadSound('/assets/sounds/froggo-RR.mp3')
		this.froggoSound.setVolume(0.65)

		this.rabbitSound = loadSound('/assets/sounds/rabbit-RR.mp3')
		this.rabbitSound.setVolume(0.65)

		this.roboboSound = loadSound('/assets/sounds/roboboSound-RR.mp3')
		this.roboboSound.setVolume(0.6)

		this.roboJump = loadSound('/assets/sounds/roboboJump-RR.mp3')
		this.roboJump.setVolume(0.6)

		this.ding = loadSound('/assets/sounds/ding.mp3')
		this.ding.setVolume(0.6)

	}

	togglePlay(music) {
		if (music.isPlaying()) return
		music.loop()
	}

	playOnce(sound) {
		if (sound.isPlaying()) return
		sound.play()
	}

	playForce(sound) {
		sound.play()
	}
	
}
