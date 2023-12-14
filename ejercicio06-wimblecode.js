const { log } = require("console")

const game = () => {
  const players = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar']
  const firstMatch = []
  const secondMatch = []
  let marcador = ''

  let isDeuce = false
  let matchs = []
  let round = 0

  const getPlayers = () => players

  const getMatchs = () => JSON.stringify(matchs, null, 1)

  const setMatchs = (value) => {
    matchs = value
    return matchs
  }

  const setScore = (score) => {
    marcador = score
    return marcador
  }

  // crearte Matchs from players
  const createMatchs = () => {
    const listMatch = []

    for (let index = 0; index < (players.length); index++) {
      const position = Math.floor(Math.random() * players.length)

      if (firstMatch.length < 2) {
        if (!firstMatch.includes(players[position])) {
          firstMatch.push({
            id: index + 1,
            name: players[position],
            score: [0],
            isDeuce: false,
            round: 0,
            juegos: 0
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
        isDeuce: false,
        round: 0,
        juegos: 0
      })
    }
    const fotmatPlayers = setMatchs(matchs.concat([firstMatch], [secondMatch]))

    for (const [index, value] of fotmatPlayers.entries()) {
      const match = {
        matchId: index + 1,
        players: [value[0], value[1]],
        winner: null
      }

      listMatch.push(match)
    }

    return setMatchs(listMatch)
  }

  const pointWonBy = (move) => {
    const match = move[0]
    const player = move[1]

    // Buscar el objeto con el ID específico
    const targetObject = matchs.find(item => item.matchId === match)
    // Buscar el player
    const playerMove = targetObject.players.find(item => item.id === player)
    // actualizo los puntos
    playerMove.score.push(0)
    const status = checkStatus(match)
    if (status === 'deuce') {
      targetObject.players.forEach(player => {
        player.isDeuce = true
      })
      return `Encuentro ${match}: DEUCE -> ${targetObject.players[0].name} - ${targetObject.players[1].name}`
    }
    if (status === 'round') {
      return `Encuentro ${match}: Ganador de Round: ${playerMove.name}`
    }
    return `Encuentro ${match}: Punto para ${playerMove.name}`
  }

  const checkStatus = (match) => {
    // console.log('Check status:', matchs[match - 1].players)

    const players = matchs[match - 1].players
    const scoreArr = []
    for (const player of players) {
      scoreArr.push({
        matchId: match,
        id: player.id,
        score: player.score,
        isDeude: player.isDeuce
      })
    }
    console.log('scoreArr:', scoreArr)
    const scoreP1 = players[0].score.length
    const scoreP2 = players[1].score.length
    let result = ''
    // revisar estos if
    if (scoreP1 > 4 && scoreP2 < 4) {
      if (roundState(scoreArr) === true) {
        result = 'round'
        return result
      }
    } else if (scoreP1 < 4 && scoreP2 > 4) {
      roundState(scoreArr)
      // falta checkear si es partido
    } else if (scoreP1 >= 4 && scoreP2 >= 4) {
      // console.log('no suma -> DEUCE')
      if (scoreArr[0].isDeude === true) {
        deuceCount(scoreArr)
      } else {
        deuceState(scoreArr)
      }
      result = 'deuce'
      return result
    }
  }

  const getCurrentRoundScore = () => {
    const roundBoard = matchs.flatMap(match => match.players.map(player => ({
      matchId: match.matchId,
      name: player.name,
      score: convertScore(player.score),
      isDeuce: player.isDeuce,
      round: player.round,
      juegos: player.juegos
    }))
    )
    // console.log('roundBoard', roundBoard)
    // setScore(roundBoard)
    let result = []
    roundBoard.forEach((match) => {
      const isDeuce = match.isDeuce ? 'Deuce ' : ''
      result += `Encuentro ${match.matchId}: ${match.name} - ${match.score} ${isDeuce}|| Round - ${match.round} Juegos - ${match.juegos}\n`
    })
    return result
  }

  const convertScore = (score) => {
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
        scoreConverted = 'Deuce'
        break
    }
    return scoreConverted
  }

  const deuceState = (players) => {
    const demo = players.map(item => ({ ...item, isDeude: true }))
    // console.log('deuceState', demo)
  }

  const deuceCount = (players) => {
    console.log('Entro en deuceCount:', players);
  }

  const roundState = (players) => {
    // console.log('roundState', players[0])
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    resetScore(obj)
    if (obj.players[0].round < 4) {
      obj.players[0].round = round + 1
      return true
    } else {
      // gana un Juego
    }
  }

  const resetScore = (obj) => {
    // console.log('ResetScore:', obj)
    for (const item of obj.players) {
      item.score = [0]
    }
  }

  // Retrun Functions
  return { players, getPlayers, createMatchs, getMatchs, pointWonBy, getCurrentRoundScore }
}
const myGame = game()
console.log(myGame.createMatchs())
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
// Duece
console.log(myGame.pointWonBy([2, 1]))
/* console.log(myGame.pointWonBy([2, 2])) */
console.log(myGame.getMatchs())
console.log(myGame.getCurrentRoundScore())
