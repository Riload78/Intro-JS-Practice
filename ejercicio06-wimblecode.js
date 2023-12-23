
const game = () => {
  const players = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar']
  const firstMatch = []
  const secondMatch = []
  let marcador = ''
  let round = 0
  let matchs = []

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
            countDeuce: [],
            isAdvance: false,
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
        countDeuce: [],
        isAdvance: false,
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
    // check if isDeuce
    // console.log('playerMove.isDeuce', playerMove.isDeuce)
    if (playerMove.isDeuce === true) {
      playerMove.countDeuce.push(0)
    } else {
      playerMove.score.push(0)
    }

    const status = checkStatus(match)
    if (status === 'deuce') {
      targetObject.players.forEach(player => {
        player.isDeuce = true
      })
      return `Encuentro ${match}: DEUCE -> ${targetObject.players[0].name} - ${targetObject.players[1].name}`
    }

    if (status === 'advance') {
      return `Encuentro ${match}: Ventaja -> ${playerMove.name}`
    }
    if (status === 'round' || status === 'winner') {
      return `Encuentro ${match}: Ganador de Round: ${playerMove.name}`
    }

    if (status === 'juego') {
      return `Encuentro ${match}: Ganador de Juego: ${playerMove.name}`
    }

    if (status === 'win match') {
      return `Encuentro ${match}: Ganador de Partido: ${playerMove.name}`
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
        isDeude: player.isDeuce,
        isAdvance: player.isAdvance,
        countDeuce: player.countDeuce,
        round: player.round,
        juegos: player.juegos
      })
    }
    // console.log('scoreArr:', scoreArr)
    const scoreP1 = players[0].score.length
    const scoreP2 = players[1].score.length
    let result = ''
    // revisar estos if
    if (scoreP1 > 4 && scoreP2 < 4) {
      result = roundState(scoreArr)
      return result
    } else if (scoreP1 < 4 && scoreP2 > 4) {
      result = roundState(scoreArr)
      return result
      // falta checkear si es partido
    } else if (scoreP1 >= 4 && scoreP2 >= 4) {
      // console.log('no suma -> DEUCE')
      /* if (scoreArr[0].isDeude === true) {
        deuceCount(scoreArr)
      } else {
        deuceState(scoreArr)
      } */

      console.log('scoreArr Despues:', scoreArr)
      result = deuceState(scoreArr)
      return result
    }
  }

  const getCurrentRoundScore = () => {
    /* let result = []
    console.log('matchs', matchs)
    const matchBoard = matchs.find(match => match.winner !== null)
    console.log('matchBoard', matchBoard) */

    const roundBoard = matchs.flatMap(match => match.players.map(player => ({
      matchId: match.matchId,
      name: player.name,
      score: convertScore(player.score),
      isDeuce: player.isDeuce,
      countDeuce: player.countDeuce,
      isAdvance: player.isAdvance,
      round: player.round,
      juegos: player.juegos
    }))
    )
    console.log('roundBoard', roundBoard)
    /* // console.log('roundBoard', roundBoard)
    // setScore(roundBoard)

    roundBoard.forEach((match) => {
      // console.log('match', match)
      const isDeuce = match.isDeuce ? 'Deuce ' : ''
      // console.log('match.countDeuce', match.countDeuce)
      const showCountDeuce = match.isAdvance ? 'Ventaja' : ''
      // console.log('showCountDeuce', match.countDeuce)
      result += `Encuentro ${match.matchId}: ${match.name} - ${match.score} ${isDeuce} ${showCountDeuce}|| Round - ${match.round} Juego - ${match.juegos}\n`
    })
    return result */
    let result = []
    console.log('matchs', matchs)
    const matchBoard = matchs.filter(match => match.winner !== null)
    const winner = matchBoard.map(item => item.matchId)
    console.log('matchBoard', matchBoard)
    console.log('winner', winner)

    roundBoard.forEach(player => {
      let scoreInfo = ''
      if (winner.includes(player.matchId)) {
      // const winner = matchBoard.map(item => item.winner)
        scoreInfo = `Ganador ${matchBoard[player.matchId - 1].winner}`
      } else {
        const isDeuce = player.isDeuce ? 'Deuce ' : ''
        const showCountDeuce = player.isAdvance ? 'Ventaja' : ''
        scoreInfo = `${player.name} - ${player.score} ${isDeuce} ${showCountDeuce}|| Round - ${player.round} Juego - ${player.juegos}`
      }
      result += `Encuentro ${player.matchId}: ${scoreInfo} \n`
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
        scoreConverted = 40
        break
    }
    return scoreConverted
  }

  const deuceState = (players) => {
    // console.log('Entro Deuce State')
    const deucePlayers = players.map(item => ({ ...item, isDeude: true }))
    // console.log('deuceState', deucePlayers)
    const deuceP1 = deucePlayers[0].countDeuce
    const deuceP2 = deucePlayers[1].countDeuce
    // console.log(deuceP1, deuceP2)

    let result = 0
    if (deuceP1.length > deuceP2.length) {
      // ventaja P1
      // console.log('Ventaja P1')
      if (checkWinRound(deuceP1, deuceP2)) {
        deuceRoundState(players)
        result = 'winner'
      } else {
        console.log('Advance')
        deuceAdvanceState(players)
        result = 'advance'
      }
    } else if (deuceP1.length < deuceP2.length && (deuceP1.length - deuceP2.length) < 2) {
      // ventaja P2
      // console.log('Ventaja p2')
      if (checkWinRound(deuceP1, deuceP2)) {
        // roundState(players)
        deuceRoundState(players)
        result = 'winner'
      } else {
        console.log('Advance')
        deuceAdvanceState(players)
        result = 'advance'
      }
    } else {
      // iguales
      console.log('Iguales')
      equalState(players)
      result = 'deuce'
    }
    console.log('Resultado:', result)
    return result
  }

  const checkWinRound = (p1, p2) => {
    let isWin = false
    if (Math.abs(p1.length - p2.length) === 2) {
      isWin = true
    }
    return isWin
  }

  const deuceRoundState = (players) => {
    let result = ''
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    const jugadorConMayorScore = getPlayerWithHightScoreDeuce(players)
    // console.log('jugadorConMayorScore deuceRoundState', jugadorConMayorScore)
    for (const match of matchs) {
      for (const player of match.players) {
        player.isDeuce = false
        if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
          player.round += 1
          player.scoreDeuce = []
          player.isAdvance = false
        }
      }
    }
    resetScore(obj)
    return result
  }

  const deuceAdvanceState = (players) => {
    let result = ''
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    const jugadorConMayorScore = getPlayerWithHightScoreDeuce(players)
    // console.log('jugadorConMayorScore deuceRoundState', jugadorConMayorScore)
    for (const match of matchs) {
      for (const player of match.players) {
        if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
          player.isAdvance = true
        }
      }
    }
    //resetScore(obj)
    return result
  }

  const equalState = (players) => {
    console.log('equalState', players)
    for (const match of matchs) {
      for (const player of match.players) {
        player.isAdvance = false
      }
    }
    return
  }

  // marca los round
  const roundState = (players) => {
    // console.log('roundState', players)
    let result = ''
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    // console.log('obj', obj)
    const jugadorConMayorScore = getPlayerWithHightScore(players)
    // console.log('jugadorConMayorScore', jugadorConMayorScore.id)
    if (obj.players[jugadorConMayorScore.id - 1].round <= 3) {
      for (const match of matchs) {
        for (const player of match.players) {
          if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
            player.round += 1
          }
        }
      }
      resetRound(obj)
      result = 'round'
    } else if (obj.players[jugadorConMayorScore.id - 1].round > 3 && Math.abs(obj.players[0].round - obj.players[1].round) < 1) {
      for (const match of matchs) {
        for (const player of match.players) {
          if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
            player.round += 1
          }
        }
      }
      resetRound(obj)
      result = 'round'
    } else {
      // gana un Juego
      console.log('Gana un juego')
      
      // console.log('jugagor', jugadorConMayorScore.name)
      // console.log('matchs', matchs)
      if (checkWinMatch(obj)) {
        const findPlayer = obj.players.find(player => player.juegos === 2)
        const nameWinPlayer = findPlayer.name
        console.log('nameWinPlayer', nameWinPlayer)
        obj.winner = nameWinPlayer
        result = 'win match'
      } else {
        for (const match of matchs) {
          for (const player of match.players) {
            if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
              player.juegos += 1
              player.round = 0
            }
          }
        }
        result = 'juego'
      }
      resetMatch(obj)
    }
    return result
  }

  const checkWinMatch = (obj) => {
    // console.log('Check Win Match')
    // console.log('checkWinMatch:', obj)
    const findPlayer = obj.players.find(player => player.juegos === 2)
    // console.log('findPlayer', findPlayer)
    let result = false
    if (findPlayer) {
      result = true
    }
    return result
  }

  const getPlayerWithHightScore = (roundState) => {
    let jugadorConMayorScore = null
    let maximoScore = -Infinity

    for (const jugador of roundState) {
      const puntajeTotal = jugador.score.length // Contar elementos en el array de score

      if (puntajeTotal > maximoScore) {
        maximoScore = puntajeTotal
        jugadorConMayorScore = jugador
      }
    }

    return jugadorConMayorScore
  }

  /*   const getPlayerWithHightRounds = (roundState) => {
    let jugadorConMayorScore = null
    let maximoScore = -Infinity

    for (const jugador of roundState) {
      const puntajeTotal = jugador.countDeuce.length // Contar elementos en el array de score

      if (puntajeTotal > maximoScore) {
        maximoScore = puntajeTotal
        jugadorConMayorScore = jugador
      }
    }

    return jugadorConMayorScore
  } */

  const getPlayerWithHightScoreDeuce = (roundState) => {
    let jugadorConMayorScore = null
    let maximoScore = -Infinity

    for (const jugador of roundState) {
      const puntajeTotal = jugador.countDeuce.length // Contar elementos en el array de score

      if (puntajeTotal > maximoScore) {
        maximoScore = puntajeTotal
        jugadorConMayorScore = jugador
      }
    }

    return jugadorConMayorScore
  }

  const resetMatch = (obj) => {
    // /*  */console.log('ResetRound:', obj)
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
      item.round = 0
    }
  }

  const resetRound = (obj) => {
    // /*  */console.log('ResetRound:', obj)
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
    }
  }

  const resetScore = (obj) => {
    // console.log('ResetScore:', obj)
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
    }
  }

  // Retrun Functions
  return { players, getPlayers, createMatchs, getMatchs, pointWonBy, getCurrentRoundScore }
}
const myGame = game()
console.log(myGame.createMatchs())
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))

console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
console.log(myGame.pointWonBy([1, 2]))
// DEUCE
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))


console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))
console.log(myGame.pointWonBy([1, 1]))

console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 1]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))


console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))
console.log(myGame.pointWonBy([2, 1]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))

console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))
console.log(myGame.pointWonBy([2, 2]))






















console.log(myGame.getMatchs())
console.log(myGame.getCurrentRoundScore())
