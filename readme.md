# INTRO JS Practice

¡Bienvenido al proyecto INTRO JS Practice! Este proyecto contiene ejercicios básicos de Javascript

## Índice de contenidos

- [Introducción](#introdución)
- [Ejercicios](#ejercicios)
- [Instalación](#instalación)
- [Uso Wimblecode](#wimblecode)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Introdución

INTRO JS es una gran herramienta para ayudar a los usuarios a familiarizarse con una aplicación web. Este proyecto sirve para practicar las características de JAVASCRIPT.

## Ejercicios

En esta práctica se plantea los siguientes ejecicios:

- Creación de un objeto y recorrerlo
- Arreglo de un bug
- Tranformaciones
- Bug de asincronía
- Catálogo musical
- Wimblecode

## Instalación

Para instalar el proyecto en tu maquina local:

1. Clonar el repositorio: `git clone git@github.com:Riload78/Intro-JS-Practice.git`
2. Cambiar de directorio: `cd intro-js-practice`
3. Ejecurar en la consola `npm install`
    - Dependencias
        - babel
        - jest (test)
        - standard (eslintConfig)
4. Los ejercicios se ejecutan con node.js
## Ejercicio 05 Biblioteca Musical
Realizado con clases y testeado con Jest


## Wimblecode

Para usar el código hay que crear un nuevo objeto
```const myGame = game()```
y llamar a las funciones correspondientes para cada ejercicio.
Funciones accesibles:
- ```myGame.createMatchs()``` -> crea los partidos de forma aleatoria a partir de un array de 4 jugadores ya establecido
- ```console.log(myGame.pointWonBy([1, 1]))``` -> es la forma de marcar un punto. El primer parámetro es el id del encuentro, y el segundo parametro es el id del jugodor. Por ejemplo, si marca el jugador 1 del partido 2 la funcion a utilizar es myGame.pointWonBy([2, 1])
- ```console.log(myGame.getCurrentRoundScore())``` -> Muestra el marcador de los partidos
- Otras funciones que se pueden usar:
    - ```myGame.getPlayers()``` -> obtiene los jugadores
    - ```myGame.getMatchs()``` -> obtiene los partidos
- Para mostar el marcador se usa:
    - ```getCurrentRoundScore()```
- Para la simulación del campeonato usar:
    - ```myGame.randomPoints()```

#### Como funciona
Lo primero que hay que hacer es instanciar un nuevo objeto de game()
Crear los partidos con ```myGame.createMatchs()``` -> se crean los partidos de forma aleatorio de un array de 4 jugadores.

Para marcar puntos hay que usar la función ```myGame.pointWonBy([1, 1])``` donde el primer parámetro es el partido 1 y el segundo corresponde al jugador 1. Cada partido tiene un id, y dos jugadores con sus respectivos id, tal y como se refleja en el siguiente fragmento de código:
```
[
 {
  "matchId": 1,
  "players": [
   {
    "id": 1,
    "name": "Alberto C",
    "score": [
     0
    ],
    "isDeuce": false,
    "countDeuce": [],
    "isAdvance": false,
    "round": 0,
    "juegos": 2
   },
   {
    "id": 2,
    "name": "David J",
    "score": [
     0
    ],
    "isDeuce": false,
    "countDeuce": [],
    "isAdvance": false,
    "round": 0,
    "juegos": 1
   }
  ],
  "winner": "Alberto C"
 },
 {
  "matchId": 2,
  "players": [
   {
    "id": 1,
    "name": "Javier M",
    "score": [
     0
    ],
    "isDeuce": false,
    "countDeuce": [],
    "isAdvance": false,
    "round": 0,
    "juegos": 0,
    "scoreDeuce": []
   },
   {
    "id": 2,
    "name": "Edu Aguilar",
    "score": [
     0
    ],
    "isDeuce": false,
    "countDeuce": [],
    "isAdvance": false,
    "round": 0,
    "juegos": 2,
    "scoreDeuce": []
   }
  ],
  "winner": "Edu Aguilar"
 }
]

```

Cuando se usa la función ```myGame.createMatchs()``` sólo se generan los partidos (2). 
La final se crea de forma automática, en función de los ganadores de los diferentes partidos.
Cuando se finaliza el último partido se crea de forma automática la final, que se añade al array de matchs con los jugadores
que ganaron los 2 partidos anteriores.

El marcador muestra el estado de los puntos, el estado Deuce con la ventaja para el jugador que la tenga,
los round y los juegos, tal y como se indica en el siguiente fragmento de consola

```
Encuentro 1: Ganador Edu Aguilar
Encuentro 1: Ganador Edu Aguilar
Encuentro 2: Ganador Javier M
Encuentro 2: Ganador Javier M
Encuentro 3: Edu Aguilar - 40 Deuce  Ventaja|| Round - 0 Juego - 0
Encuentro 3: Javier M - 40 Deuce  || Round - 0 Juego - 0
```

Para simular el campeonato usar

```
randomPoints()
```

## Uso

Este proyecto es para practicar INTRO JS, así que siéntete libre de modificar el código y experimentar con diferentes características y funcionalidades.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tiene alguna idea o mejora para este proyecto, envíe un pull request o abra un incidencia.

## Licencia

Este proyecto tiene la licencia MIT; consulte el archivo de LICENCIA para obtener más detalles.
