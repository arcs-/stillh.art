// gloabl

// game
// birds

const Neat = neataptic.Neat
const Methods = neataptic.Methods
const Config = neataptic.Config
const Architect = neataptic.Architect

let neat = null

let progressChart = null
let data = {
  datasets: [{
      label: "Average",
      backgroundColor: "#4ec0ca",
      borderColor: "#4ec0ca",
      fill: false,
      data: []
    },
    {
      label: "Best",
      backgroundColor: "#5ee270",
      borderColor: "#5ee270",
      fill: false,
      data: []
    }
  ]
}


function initNeat() {

  neat = new Neat(
    3,
    1,
    null, {
      popsize: ai.birds,
      elitism: Math.round(ai.elitism * ai.birds),
    }
  )

  progressChart = new Chart(progress.getContext('2d'), {
    type: 'line',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })

}

function startEvaluation() {
  birds.length = 0

  for (let genome of neat.population)
    birds.push(new Bird(game, genome))

}

function endEvaluation() {

  dispatchEvent(new Event('reset'))

  neat.sort()

  /* ui */
  generation.innerHTML = "generation " + neat.generation

  data.labels.push(neat.generation)
  data.datasets[0].data.push(neat.getAverage())
  data.datasets[1].data.push(neat.population[0].score)
  progressChart.update()


  /* selection */
  var newPopulation = []

  // Elitism
  for (var i = 0; i < neat.elitism; i++)
    newPopulation.push(neat.population[i])

  // Breed the next individuals
  for (var i = 0; i < neat.popsize - neat.elitism; i++)
    newPopulation.push(neat.getOffspring())

  // Replace the old population with the new population
  neat.population = newPopulation
  neat.mutate()

  neat.generation += 1
  startEvaluation()
  start()

}

/*
  init
*/

initNeat()

loadAssets(game, ['ctx'], function() {
  startEvaluation()
  start()

})

addEventListener('done', function() {
  endEvaluation()

})
