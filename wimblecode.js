class Game {
  constructor () {
    this.score = 0
    this.players = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar']
    this.matchs = []
    this.listMatch = []
  }

  setMatchs (value) {
    this.matchs = value
  }

  getMatchs () {
    console.log(this.matchs)
    return this.matchs
  }

  setListMatch (value) {
    this.listMatch = value
  }

  getListMatch () {
    console.log(this.listMatch)
    return this.listMatch
  }

  // crearte Matchs from players
  createMatchs () {
    const players = this.players
    const matchs = []
    const firstMatch = []
    const secondMatch = []
    for (let index = 0; index < (players.length); index++) {
      const position = Math.floor(Math.random() * this.players.length)
      if (firstMatch.length < 2) {
        if (!firstMatch.includes(players[position])) {
          firstMatch.push({
            id: index + 1,
            name: players[position],
            score: [0]
          })
          players.splice(position, 1)
        }
      }
    }

    for (const [index, value] of players.entries()) {
      secondMatch.push({
        id: index + 1,
        name: value,
        score: [0]
      })
    }

    this.setMatchs(matchs.concat([firstMatch], [secondMatch]))
  }

  createMatch () {
    const matchs = this.matchs
    const listMatch = []
    for (const [index, value] of matchs.entries()) {
      const match = {
        matchId: index + 1,
        player1: value[0],
        player2: value[1],
        play: 0,
        round: 0,
        winner: false
      }
      listMatch.push(match)
    }

    this.setListMatch(listMatch)
  }

  pointWonBy (move) {
    const match = move[0]
    const player = move[1]
    console.log('match:', match)
    console.log('player:', player)
    // Buscar el objeto con el ID específico
    const targetObject = this.listMatch.find(item => item.matchId === match)
    console.log('targetObject', targetObject)
  }

  getCurrentRoundScore () {
    return true
  }

  getMatchScore () {
    return true
  }

  getWinner () {
    return true
  }
}

/* class Match extends Game {
  constructor (match) {
    super()
    this.player1 = player1 || null
    this.player2 = player2 || null
    this.scorePlayer1 = 0
    this.scorepalyer2 = 0
    this.currentPlayer = ''
    this.round = 1
    this.winner = false
  }
} */

const game = new Game()
// crea el torneo con los jugadores de forma ramdom
game.createMatchs()
// Crea los partidos
game.createMatch()
// Lista los partidos
game.getListMatch()
// Puntos ganados por jugador
game.pointWonBy([1, 1])
game.pointWonBy([2, 2])

module.exports = { Game }
