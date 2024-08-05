document.addEventListener('DOMContentLoaded', (event) => {
  const blueWhite = document.getElementById('blue-white-grid')
  // const eggShell = document.getElementById('eggshell')
  // const beige = document.getElementById('beige')

  const blue_white = [
    { name: 'Josh', scores: ['X', 2, 1.5, 2.5, 1.5, 1, 8.5] },
    { name: 'Micheal', scores: [1, 'X', 2, 0, 3, 1.5, 7.5] },
    { name: 'Trey', scores: [1.5, 1, 'X', 2, 3, 1, 8.5] },
    { name: 'Cole', scores: [0.5, 3, 2.5, 'X', 2, 1.5, 9.5] },
    { name: 'Chris', scores: [1.5, 1, 2, 3, 'X', 1, 8.5] },
    { name: 'Dan', scores: [2, 3, 2, 1, 3, 'X', 11] },
  ]

  console.log(getStandingsArray(blue_white))
  blueWhite.innerHTML = generatePlayerGrid(blue_white)

  function generatePlayerGrid(division) {
    let html = '<div class="player-grid"><span class="label">Player</span>'

    // top label row
    division.forEach((player) => {
      html += `<span class="label">${player.name}</span>`
    })

    for (let player = 0; player < division.lengh; player++) {
      html += `<span class="label">${player.name}</span>`
      for (let i = 0; i < player.scores.lengh; i++) {
        html += '<span>${player.scores[i]}</span>'
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

    // console.log(sortedByTotalPoints)
    return sortedByTotalPoints
  }

  const eggshell = [
    { name: 'Aaron', scores: ['X', '-', '-', '-', '-', 0] },
    { name: 'Justin', scores: ['-', 'X', '-', '-', '-', 0] },
    { name: 'Francesco', scores: ['-', '-', 'X', '-', '-', 0] },
    { name: 'Pierre', scores: ['-', '-', '-', 'X', '-', 0] },
    { name: 'Dan', scores: ['-', '-', '-', '-', 'X', 0] },
  ]

  const beige = [
    { name: 'Conrad', scores: ['X', 2, '-', '-', 2] },
    { name: 'Keegan', scores: [1, 'X', '-', '-', 1] },
    { name: 'Marc', scores: ['-', '-', 'X', '-', 0] },
    { name: 'Garry', scores: ['-', '-', '-', 'X', 0] },
  ]

  console.log('testing')
})
