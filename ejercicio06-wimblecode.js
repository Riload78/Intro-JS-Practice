const game = () => {
  const initialPlayers = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar']
  const firstMatch = []
  const secondMatch = []
  let matchs = []

  const getPlayers = () => initialPlayers

  const getMatchs = () => JSON.stringify(matchs, null, 1)

  const setMatchs = (value) => {
    matchs = value
    return matchs
  }

  /**
   * crearte Matchs from players
   * @param {Array} players
   * @returns {Array}
   */
  const createMatchs = (players = initialPlayers) => {
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

  /**
   * Create point
   * @param {Array} move
   * @returns {string}
   */

  const pointWonBy = (move) => {
    const match = move[0]
    const player = move[1]

    // Buscar el objeto con el ID específico
    const targetObject = matchs.find(item => item.matchId === match)
    // Buscar el player
    const playerMove = targetObject.players.find(item => item.id === player)
    // actualizo los puntos
    // check if isDeuce
    if (playerMove.isDeuce === true) {
      playerMove.countDeuce.push(0)
    } else {
      playerMove.score.push(0)
    }

    const status = checkStatus(match, player)

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

    if (status === 'final') {
      return `Encuentro ${match}: Ganador de Partido: ${playerMove.name}\nComienza la Final!!!!`
    }

    if (status === 'champion') {
      return `Encuentro ${match}: Punto para ${playerMove.name}\nGanador del campeonato: ${playerMove.name}!!!!`
    }

    return `Encuentro ${match}: Punto para ${playerMove.name}`
  }
  /**
   * Check status match id
   * @param {number} match id
   * @returns {string}
   */
  const checkStatus = (match, player) => {
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

    const scoreP1 = players[0].score.length
    const scoreP2 = players[1].score.length
    let result = ''

    if (scoreP1 > 4 && scoreP2 < 4) {
      result = roundState(scoreArr, player)
    } else if (scoreP1 < 4 && scoreP2 > 4) {
      result = roundState(scoreArr, player)
    } else if (scoreP1 >= 4 && scoreP2 >= 4) {
      result = deuceState(scoreArr, player)
    }
    return result
  }
  /**
   * Get General Score
   * @returns {string}
   */
  const getCurrentRoundScore = () => {
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
    let result = []
    const matchBoard = matchs.filter(match => match.winner !== null)
    const winner = matchBoard.map(item => item.matchId)

    roundBoard.forEach(player => {
      let scoreInfo = ''
      if (winner.includes(player.matchId)) {
        scoreInfo = `Ganador ${matchBoard[player.matchId - 1].winner}`
      } else {
        const isDeuce = player.isDeuce ? 'Deuce ' : ''
        const showCountDeuce = player.isAdvance ? 'Ventaja ' : ''
        scoreInfo = `${player.name} - ${player.score} ${isDeuce} ${showCountDeuce}|| Round - ${player.round} Juego - ${player.juegos}`
      }
      result += `Encuentro ${player.matchId}: ${scoreInfo} \n`
      result += '--------------------------------------------------------\n'
    })

    return `-------MARCADOR------\n${result}`
  }

  /**
   * Convert array in number
   * @param {array} score
   * @returns {number}
   */

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

  /**
   * Deuce State to control Deuce
   * @param {array} players
   * @returns {string}
  */
  const deuceState = (players, player) => {
    const deucePlayers = players.map(item => ({ ...item, isDeude: true }))
    const deuceP1 = deucePlayers[0].countDeuce
    const deuceP2 = deucePlayers[1].countDeuce

    let result = ''
    if (deuceP1.length > deuceP2.length || deuceP1.length < deuceP2.length) {
      if (checkWinRound(deuceP1, deuceP2)) {
        result = deuceRoundState(players, player)
      } else {
        result = deuceAdvanceState(players, player)
      }
    } else {
      result = equalState(players)
    }
    return result
  }

  /**
   * Check if player win Round
   * @param {array} p1
   * @param {array} p2
   * @returns {boolean}
  */
  const checkWinRound = (p1, p2) => {
    let isWin = false
    if (Math.abs(p1.length - p2.length) === 2) {
      isWin = true
    }
    return isWin
  }

  /**
   *  Check if is juego, champion or round
   * @param {array} players
   * @returns {string}
  */
  const deuceRoundState = (players, player) => {
    let result = ''
    const playerMoveId = player
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    const jugadorConMayorScore = getPlayerWithHightScoreDeuce(players)
    const jugadorConMayorJuegos = getPlayeWhithHightJuegos(players)
    if (obj.players[playerMoveId - 1].round.length > 7 && jugadorConMayorJuegos === playerMoveId) {
      // se acaba el partido
      for (const match of matchs) {
        for (const player of match.players) {
          player.isDeuce = false
          if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
            player.juegos += 1
            player.round = 0
            player.scoreDeuce = []
            player.isAdvance = false
            resetMatch(obj)
            result = 'juego'
          }
        }
      }
    } else if (Math.abs(obj.players[0].countDeuce.length - obj.players[1].countDeuce.length) === 2) {
      // el jugadorConMayorScore tiene ventaja y gana el round
      if ((Math.abs(obj.players[0].round - obj.players[1].round) >= 2 && obj.players[playerMoveId - 1].round >= 4) && Math.abs(obj.players[0].juegos - obj.players[1].juegos) < 2) {
        // es juego -> juego +1
        if (checkWinMatchDeuce(obj, playerMoveId)) {
          const findPlayer = obj.players.find(player => player.juegos === 2)
          const nameWinPlayer = findPlayer.name
          obj.winner = nameWinPlayer
          result = 'champion'
        } else {
          for (const match of matchs) {
            for (const player of match.players) {
              player.isDeuce = false
              if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
                player.juegos += 1
                player.round = 0
                player.scoreDeuce = []
                player.isAdvance = false
                resetMatch(obj)
                result = 'juego'
              }
            }
          }
        }
      } else {
        // es round -> round +1
        for (const match of matchs) {
          for (const player of match.players) {
            player.isDeuce = false
            if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
              player.round += 1
              player.scoreDeuce = []
              player.isAdvance = false
              resetRound(obj)
              result = 'winner'
            }
          }
        }
      }
    }
    resetScore(obj)
    return result
  }

  /**
   * Check if is Advance in deuce State
   * @param {array} players
   * @returns {string}
  */
  const deuceAdvanceState = (players) => {
    let result = ''
    const jugadorConMayorScore = getPlayerWithHightScoreDeuce(players)

    for (const match of matchs) {
      for (const player of match.players) {
        if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
          player.isAdvance = true
          result = 'advance'
        }
      }
    }
    return result
  }
  /**
   * check if is equal in deuce state
   * @param {array} players
   * @returns {string}
  */
  const equalState = (players) => {
    let result = ''
    for (const match of matchs) {
      for (const player of match.players) {
        player.isAdvance = false
        result = 'deuce'
      }
    }
    return result
  }

  /**
   * Check the round
   * @param {array} players
   * @returns {string}
  */
  const roundState = (players, player) => {
    let result = ''
    const obj = matchs.find(item => item.matchId === players[0].matchId)
    const jugadorConMayorScore = getPlayerWithHightScore(players)

    if (obj.players[player - 1].round <= 3) {
      for (const match of matchs) {
        for (const player of match.players) {
          if (player.id === jugadorConMayorScore.id && match.matchId === jugadorConMayorScore.matchId) {
            player.round += 1
          }
        }
      }
      resetRound(obj)
      result = 'round'
    } else if ((obj.players[player - 1].round > 3 && obj.players[player - 1].round < 7) && Math.abs(obj.players[0].round - obj.players[1].round) >= 0 && Math.abs(obj.players[0].round - obj.players[1].round) <= 2) {
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
      if (checkWinMatch(obj, player)) {
        const findPlayer = obj.players.find(player => player.juegos === 2)
        const nameWinPlayer = findPlayer.name
        obj.winner = nameWinPlayer

        if (checkIsFinal()) {
          const isFinal = matchs.filter(match => match.winner !== null)
          const finalPlayers = []
          for (let index = 0; index < (isFinal.length); index++) {
            finalPlayers.push({
              id: index + 1,
              name: isFinal[index].winner,
              score: [0],
              isDeuce: false,
              countDeuce: [],
              isAdvance: false,
              round: 0,
              juegos: 0
            })
          }
          matchs.push({
            matchId: 3,
            players: finalPlayers,
            winner: null

          })

          result = 'final'
        } else if (checkIsChampion()) {
          result = 'champion'
        }
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

  const getPlayeWhithHightJuegos = (players) => {
    let maxJuegos = players[0].juegos

    for (let i = 1; i < players.length; i++) {
      if (players[i].juegos > maxJuegos) {
        maxJuegos = players[i].juegos
      }
    }

    return maxJuegos
  }

  const checkWinMatchDeuce = (obj, player) => {
    let result = false
    const findPlayer = obj.players.find(player => player.juegos === 2)
    if (findPlayer === undefined) {
      result = false
    } else if (findPlayer.id === player.id) {
      result = true
    }
    return result
  }

  /**
   * Check win Match (partido)
   * @param {object} obj
   * @returns {boolean}
   */
  const checkWinMatch = (obj) => {
    const findPlayer = obj.players.find(player => player.juegos === 2)
    let result = false
    if (findPlayer) {
      result = true
    }
    return result
  }

  /**
   * Check if is Final
   * @returns {string}
   */
  const checkIsFinal = () => {
    let result = false
    const isFinal = matchs.filter(match => match.winner !== null)
    if (isFinal.length === 2) {
      result = true
    }
    return result
  }

  const checkIsChampion = () => {
    let result = false
    const isFinal = matchs.filter(match => match.winner !== null)
    if (isFinal.length > 2) {
      result = true
    }
    return result
  }

  /**
   * Get player with hight score from a match
   * @param {object} roundState
   * @returns {object}
   */
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

  /**
   * Get player with hight Deuce Score from a match
   * @param {object} roundState
   * @returns {object}
   */
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

  /**
   * Reset Match
   * @param {*} obj
   */
  const resetMatch = (obj) => {
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
      item.round = 0
    }
  }

  /**
   * Reset Round
   * @param {*} obj
   */
  const resetRound = (obj) => {
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
    }
  }

  /**
   * Reset Score
   * @param {*} obj
   */
  const resetScore = (obj) => {
    for (const item of obj.players) {
      item.score = [0]
      item.countDeuce = []
    }
  }

  /**
   * Create a Ramdom Championship
   * @param {} obj
   */
  const randomPoints = () => {
    for (let index = 0; index < 3; index++) {
      while (matchs[index].winner === null) {
        console.log(pointWonBy([matchs[index].matchId, Math.floor(Math.random() * 2) + 1]))
        console.log(getCurrentRoundScore())
      }
    }
  }

  // Return Functions
  return { getPlayers, createMatchs, getMatchs, pointWonBy, getCurrentRoundScore, randomPoints, setMatchs }
}

const myGame = game()
console.log(myGame.getPlayers())
console.log(myGame.createMatchs())
myGame.randomPoints()
