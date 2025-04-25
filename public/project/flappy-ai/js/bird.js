class Bird {

  constructor(game, genome) {

    this.game = game
    this.dead = false
    this.x = game.birdX
    this.y = game.height / 2
    this.velocity = game.flap

    this.brain = genome
    this.brain.score = 0

  }

  update() {

    /*
      game
    */
    this.velocity += this.game.gravity
    let newY = this.y + this.velocity

    if (newY > this.game.height - this.game.floor.asset.height - this.game.bird.width + 5 || newY < 0 || this.dead) {

      if (!this.dead) this.dead = true
      this.x -= this.game.speed

    } else {

      this.y = newY
      this.brain.score = this.game.progress

      // ai implemenation
      let output = this.brain.activate([this.y, this.game.next.open, this.game.next.x - this.x + this.game.pipes.assetUp.width / 2])
      if (output[0] >= .5) this.tap()

    }

    this.game.ctx.save()
    this.game.ctx.translate(this.x, this.y)

    this.rotation = Math.min((this.velocity / 10) * 90, 90)
    this.game.ctx.rotate(this.rotation * Math.PI / 180)

    this.game.ctx.drawImage(game.bird.asset,
      0,
      this.fitness ? 0 : this.game.bird.height * (this.game.progress / 8 % this.game.bird.steps | 0),
      this.game.bird.width,
      this.game.bird.height,
      0,
      0,
      this.game.bird.width,
      this.game.bird.height)

    this.game.ctx.restore()

  }

  tap() {
    this.velocity = game.flap
  }

}
