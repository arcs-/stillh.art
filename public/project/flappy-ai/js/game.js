/*
  INITIALIZE
*/
const stats = new Stats()
stats.showPanel(0)
fps.appendChild(stats.domElement)

addEventListener('resize', (function _self(e) {
  game.width = gameCanvas.width = innerWidth

  return _self
})())

addEventListener('reset', (function _self(e) {
  game.progress = 0
  game.pipes.objects.length = 0
  game.next = null

  return _self
})())

/*
  PRIMARY GAME LOOP
*/
let ctx = game.ctx

function start() {

  let countAlive = birds.filter(bird => !bird.dead).length
  if (countAlive) requestAnimationFrame(start)
  else return dispatchEvent(new Event('done'))

  stats.begin()

  game.progress += game.speed
  fitness.innerHTML = "fitness " + game.progress

  ctx.clearRect(0, 0, game.width, game.height)

  // background
  for (let i = 0; i * game.background.asset.width < game.width + game.background.asset.width; i++)
    ctx.drawImage(game.background.asset,
      i * game.background.asset.width - game.progress / 2 % game.background.asset.width,
      game.height - game.floor.asset.height - game.background.asset.height)


  // pipes
  if (game.progress % game.spacing === 0 || game.progress === game.speed) game.pipes.objects.push(new Pipe(game))
  if (!game.next) game.next = game.pipes.objects[0]

  for (let i = 0, pipe; pipe = game.pipes.objects[i]; i++) {

    // move the pipes and remove old ones
    pipe.x -= game.speed
    if (pipe.x + game.pipes.assetDown.width < 0) {
      game.pipes.objects.splice(i, 1)
      i--
      continue
    }

    // draw the pipe
    pipe.update()

  }

  for (let i = 0, pipe; pipe = game.pipes.objects[i]; i++) {
    if (pipe.x < game.birdX + game.bird.width && pipe.x + pipe.width > game.birdX) { // all birds have the same x

      for (let i = 0, bird; bird = birds[i]; i++)
        if (bird.y < pipe.open - game.gap || bird.y > pipe.open + game.gap) bird.dead = true

      break

    }
  }

  if (game.next.x + game.pipes.assetUp.width / 2 < game.birdX)
    game.next = game.pipes.objects[1]

  // birds
  for (let i = 0, bird; bird = birds[i]; i++) bird.update()

  // floor
  for (let i = 0; i * game.floor.asset.width < game.width + game.floor.asset.width; i++)
    ctx.drawImage(game.floor.asset,
      i * game.floor.asset.width - game.progress % game.floor.asset.width,
      game.height - game.floor.asset.height)

  stats.end()

}
