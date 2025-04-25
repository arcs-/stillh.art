class Pipe {

  constructor(game) {
    this.game = game

    this.x = Math.min(game.width, 500)
    this.open = random(game.start, game.end)

    this.width = game.pipes.assetBody.width
    this.offset = game.height / 2

  }

  update() {

    if (this.offset > 0) this.offset -= this.game.speed * 3
    else this.offset = 0

    this.game.ctx.drawImage(this.game.pipes.assetBody,
      this.x, -this.offset,
      this.width,
      this.open - this.game.gap - this.game.pipes.assetUp.height)
    this.game.ctx.drawImage(this.game.pipes.assetDown,
      this.x,
      this.open - this.game.gap - this.game.pipes.assetDown.height - this.offset)
    this.game.ctx.drawImage(this.game.pipes.assetUp,
      this.x,
      this.open + this.game.gap + this.offset)
    this.game.ctx.drawImage(this.game.pipes.assetBody,
      this.x,
      this.open + this.game.gap + this.game.pipes.assetUp.height + this.offset,
      this.width,
      this.game.height)


  }

}
