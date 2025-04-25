const birds = []

const ai = {
  birds: 50,
  elitism: 0.1
}

const game = {
  ctx: gameCanvas.getContext('2d'),
  width: 0,
  height: gameCanvas.height = 500, // look for "end"

  birdX: 80,
  gravity: 0.25,
  flap: -4.6,

  gap: 50,
  start: 75,
  end: 310,
  spacing: 200,

  speed: 2,
  progress: 0,

  bird: {
    asset: 'asset:assets/bird.png',
    height: 24,
    width: 34,
    steps: 4
  },

  pipes: {
    assetUp: 'asset:assets/pipe-up.png',
    assetDown: 'asset:assets/pipe-down.png',
    assetBody: 'asset:assets/pipe.png',

    objects: []

  },

  floor: {
    asset: 'asset:assets/land.png',
  },

  background: {
    asset: 'asset:assets/sky.png',
    yOffset: 0
  }

}
