document.addEventListener('DOMContentLoaded', (event) => {
  const blueWhite = document.getElementById('blue-white-grid')
  const eggShell = document.getElementById('eggshell-grid')
  const Beige = document.getElementById('beige-grid')

  const blueWhiteStandings = document.getElementById('blue-white-standings')
  const eggShellStandings = document.getElementById('eggshell-standings')
  const beigeStandings = document.getElementById('beige-standings')

  const blue_white = [
    { name: 'Josh', scores: ['X', 2.5, '-', '-', '-', '-', 2.5] },
    { name: 'Micheal', scores: [0.5, 'X', '-', '-', '-', '-', 0.5] },
    { name: 'Trey', scores: ['-', '-', 'X', 0, '-', '-', 0] },
    { name: 'Cole', scores: ['-', '-', 3, 'X', '-', '-', 3] },
    { name: 'Chris', scores: ['-', '-', '-', '-', 'X', 3, 3] },
    { name: 'Dan', scores: ['-', '-', '-', '-', 0, 'X', 0] },
  ]

  const eggshell = [
    { name: 'Aaron', scores: ['X', 3, '-', '-', '-', 3] },
    { name: 'Justin', scores: [0, 'X', '-', '-', 0.5, 0.5] },
    { name: 'Francesco', scores: ['-', '-', 'X', '-', '-', 0] },
    { name: 'Pierre', scores: ['-', '-', '-', 'X', '-', 0] },
    { name: 'Dan', scores: ['-', 2.5, '-', '-', 'X', 2.5] },
  ]

  const beige = [
    { name: 'Conrad', scores: ['X', 2, '-', '-', 2] },
    { name: 'Keegan', scores: [1, 'X', 1, '-', 2] },
    { name: 'Marc', scores: ['-', 2, 'X', '-', 2] },
    { name: 'Garry', scores: ['-', '-', '-', 'X', 0] },
  ]

  // Dynamically generate each division's player head-to-head grid
  blueWhite.innerHTML = generatePlayerGrid(blue_white, 'lightblue')
  let playerGrid = document.querySelector('#blue-white-grid .player-grid')
  playerGrid.style.gridTemplateColumns = `80px repeat(${blue_white[0].scores.length}, 1fr)`
  blueWhiteStandings.innerHTML = generatePlayerStandings(
    blue_white,
    'lightblue'
  )

  eggShell.innerHTML = generatePlayerGrid(eggshell, 'eggshell')
  playerGrid = document.querySelector('#eggshell-grid .player-grid')
  playerGrid.style.gridTemplateColumns = `80px repeat(${eggshell[0].scores.length}, 1fr)`
  eggShellStandings.innerHTML = generatePlayerStandings(eggshell, 'eggshell')

  Beige.innerHTML = generatePlayerGrid(beige, 'beige')
  playerGrid = document.querySelector('#beige-grid .player-grid')
  playerGrid.style.gridTemplateColumns = `80px repeat(${beige[0].scores.length}, 1fr)`
  beigeStandings.innerHTML = generatePlayerStandings(beige, 'beige')

  function generatePlayerGrid(division, bgColor) {
    let html = '<h3>Head To Head</h3>'
    html += `<div class="player-grid"><span class="label side ${bgColor}">Player</span>`

    // top label row
    division.forEach((player) => {
      html += `<span class="label top ${bgColor}">${player.name}</span>`
    })
    html += `<span class="label top ${bgColor}">Total</span>`

    // get each player, scores, & totals
    for (let playerIndex = 0; playerIndex < division.length; playerIndex++) {
      let player = division[playerIndex]
      html += `<span class="label side ${bgColor}">${player.name}</span>`
      for (let i = 0; i < player.scores.length; i++) {
        if (player.scores[i] === 'X') {
          html += `<span class="shaded">${player.scores[i]}</span>`
        } else {
          html += `<span>${player.scores[i]}</span>`
        }
      }
    }
    html += '</div>'

    return html
  }

  function getStandingsArray(division) {
    const sortedByTotalPoints = division
      .map((player) => ({
        name: player.name,
        totalPoints: player.scores[player.scores.length - 1],
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)

    return sortedByTotalPoints
  }

  function generatePlayerStandings(division, bgColor) {
    let sortedStandingArr = getStandingsArray(division)

    let html = '<h3>Standings</h3>'
    html += `<div class="standings-grid"><span class="label side ${bgColor}">Player</span>
      <span class="label top ${bgColor}">Points</span>`

    sortedStandingArr.forEach((player) => {
      html += `<span class="label side ${bgColor}">${player.name}</span>`
      html += `<span class="label top ${bgColor}">${player.totalPoints}</span>`
    })

    html += '</div>'

    return html
  }
})
