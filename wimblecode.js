class Game {
  constructor () {
    this.players = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar']
    this.matchs = []
    this.listMatch = []
    this.score = []
    this.isDeuce = false
    this.round = 0
    this.juegos = 0
  }

  setMatchs (value) {
    this.matchs = value
  }

  getMatchs () {
    return this.matchs
  }

  setListMatch (value) {
    this.listMatch = value
  }

  getListMatch () {
    console.log(JSON.stringify(this.listMatch, null, 1))
    return this.listMatch
  }

  setScore (value) {
    this.score = value
  }

  getScore () {
    console.log('Get Store:', this.score)
    return this.score
  }

  getIsDeuce () {
    console.log('Get Deuce', this.isDeuce)
    return this.isDeuce
  }

  setIsDeuce (value) {
    this.isDeuce = value
  }

  // crearte Matchs from players
  createMatchs () {
    const players = this.players
    const firstMatch = []
    const secondMatch = []
    for (let index = 0; index < (players.length); index++) {
      const position = Math.floor(Math.random() * this.players.length)
      if (firstMatch.length < 2) {
        if (!firstMatch.includes(players[position])) {
          firstMatch.push({
            id: index + 1,
            name: players[position],
            score: [0],
            isDeuce: this.isDeuce,
            round: this.round,
            juegos: this.juegos
          })
          players.splice(position, 1)
        }
      }
    }

    for (const [index, value] of players.entries()) {
      secondMatch.push({
        id: index + 1,
        name: value,
        score: [0],
        isDeuce: this.isDeuce,
        round: this.round,
        juegos: this.juegos
      })
    }

    this.setMatchs(this.matchs.concat([firstMatch], [secondMatch]))
  }

  createMatch () {
    const matchs = this.matchs
    const listMatch = []
    for (const [index, value] of matchs.entries()) {
      const match = {
        matchId: index + 1,
        players: [value[0], value[1]],
        winner: false
      }
      listMatch.push(match)
    }

    this.setListMatch(listMatch)
  }

  pointWonBy (move) {
    const match = move[0]
    const player = move[1]

    // Buscar el objeto con el ID específico
    const targetObject = this.listMatch.find(item => item.matchId === match)
    // Buscar el player
    const playerMove = targetObject.players.find(item => item.id === player)
    // actualizo los puntos
    playerMove.score.push(0)
    this.checkStatus(match)
  }

  checkStatus (targetObject) {
    // console.log('Check status:', this.listMatch[targetObject - 1].players)
    const players = this.listMatch[targetObject - 1].players
    const scoreArr = []
    for (const player of players) {
      scoreArr.push({
        matchId: targetObject,
        id: player.id,
        score: player.score,
        isDeude: player.isDeuce
      })
    }
    console.log('scoreArr:', scoreArr)
    const scoreP1 = scoreArr[0].score.length
    const scoreP2 = scoreArr[1].score.length
    // revisar estos if
    if (scoreP1 > 4 && scoreP2 < 4) {
      console.log('this.setWinner(scoreArr[0].id)')
    } else if (scoreP1 < 4 && scoreP2 > 4) {
      this.roundState(scoreArr)
      // falta checkear si es partido
    } else if (scoreP1 === 4 && scoreP2 < 4) {
      console.error('suma scrore p1')
    } else if (scoreP2 === 4 && scoreP1 < 4) {
      console.log('suma score 2')
    } else if (scoreP1 >= 4 && scoreP2 >= 4) {
      console.log('no suma -> DEUCE')
      // this.setIsDeuce(true)
      const scoreArrDeuce = scoreArr.map(item => ({ ...item, isDeude: true }))
      console.log('nuevoScoreArr:', scoreArrDeuce)
      this.deuceState(scoreArrDeuce)
    } else {
      console.log('no pasa nada- actualizo contador')
    }
  }

  getCurrentRoundScore () {
    const roundBoard = []
    let playerName = ''
    let playerScore = 0
    for (const item of this.listMatch) {
      for (const player of item.players) {
        console.log('getCurrentRoundScore:', player)
        playerName = player.name
        playerScore = this.convertScore(player.score)
        roundBoard.push({
          matchId: item.matchId,
          name: playerName,
          score: playerScore,
          isDeuce: player.isDeuce,
          round: player.round,
          juegos: player.juegos
        })
      }
    }

    this.setScore(roundBoard)
    roundBoard.forEach((match) => {
      const isDeuce = match.isDeuce ? 'Deuce' : ''
      console.log('isDeuce:', isDeuce)
      console.log(`Encuentro ${match.matchId}: ${match.name} - ${match.score} ${isDeuce}|| Round - ${match.round} Juegos - ${match.juegos}`)
    })
  }

  resetScore (obj) {
    console.log('ResetScore:', obj)
    for (const item of obj.players) {
      item.score = [0]
    }
  }

  /**
   * Convert array score in Number
   * @param {object} score
   * @returns number
   */

  convertScore (score) {
    let scoreConverted = ''
    switch (score.length) {
      case 1:
        scoreConverted = 0
        break
      case 2:
        scoreConverted = 15
        break
      case 3:
        scoreConverted = 30
        break
      case 4:
        scoreConverted = 40
        break
      default:
        scoreConverted = 'Advance'
        break
    }
    return scoreConverted
  }

  roundState (players) {
    const obj = this.listMatch.find(item => item.matchId === players[1].matchId)
    obj.players[0].round = this.round + 1
    this.resetScore(obj)
  }

  deuceState (players) {
    console.log('Deuce function:', players)
    const obj = this.listMatch.find(item => item.matchId === players[0].matchId)
    console.log('obj listMatch:', obj)
    for (const player of players) {
      const playerToUpdate = player.map(item => ({ ...item, isDeude: player.isDeuce }))
      // const playerToUpdate = this.listMatch.find(match => match.matchId === player.matchId)
      console.log('playerToUpdate', playerToUpdate)
    }
    const scoreP1 = players[0].score.length
    const scoreP2 = players[1].score.length
    if (Math.abs(scoreP1 - scoreP2) === 2) {
      console.log('Round ganado')
    } else if (Math.abs(scoreP1 - scoreP2) === 1) {
      console.log('Ventaja')
    } else {
      console.log('Igules')
    }
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
game.pointWonBy([1, 2])
game.pointWonBy([1, 2])
game.pointWonBy([1, 2])
game.pointWonBy([1, 2])
game.pointWonBy([2, 2])
game.pointWonBy([2, 2])
game.pointWonBy([2, 1])
game.pointWonBy([2, 1])
game.pointWonBy([2, 1])
game.pointWonBy([2, 2])
// game.pointWonBy([2, 2])
// game.pointWonBy([2, 2])
/* game.pointWonBy([2, 2])
game.pointWonBy([1, 1])
game.pointWonBy([1, 2]) */
game.getCurrentRoundScore()
game.getListMatch()
// game.getListMatch()
// game.getCurrentRoundScore()

module.exports = { Game }
