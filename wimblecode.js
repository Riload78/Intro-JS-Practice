const { match } = require("assert")
const { runInThisContext } = require("vm")

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
    for (let index = 0; index < (players.length); index++) {
      const position = Math.floor(Math.random() * this.players.length)
      if (firstMatch.length < 2) {
        if (!firstMatch.includes(players[position])) {
          firstMatch.push(players[position])
          players.splice(position, 1)
        }
      }
    }
    this.setMatchs(matchs.concat([firstMatch], [players]))
  }

  createMatch () {
    const matchs = this.matchs
    const listMatch = []
    for (const [index, value] of matchs.entries()) {
      const match = {
        id: index,
        player1: value[0],
        player2: value[1],
        scorePlayer1: 0,
        scorePlayer2: 0,
        winner: ''
      }
      listMatch.push(match)
    }

    this.setListMatch(listMatch)
  }

  pointWonBy (player) {
    return true
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

class Match extends Game {
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
}

const game = new Game()
game.createMatchs()
game.getMatchs()
game.createMatch()
game.getListMatch()

module.exports = { Game }
