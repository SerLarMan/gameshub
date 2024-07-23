import { showToast } from "../toast/toast";
import { nextTurn, turn } from "../../utils/tresrayaUtils";
import { addPoints } from "../../utils/windowUtils";

import "./tresRayaTile.scss";

export function setUpTresrayaTile(tile) {
  const tileDiv = document.createElement("div");
  tileDiv.x = tile.x;
  tileDiv.y = tile.y;
  tileDiv.classList.add("square");
  tileDiv.clickable = true;
  tileDiv.addEventListener("mouseup", handleTileClick);

  const span = document.createElement("span");
  span.textContent = "";

  tileDiv.append(span);
  return tileDiv;
}

/**
 * Función que le da la funcionalidad de click a cada casilla
 * @param {*} e
 */
function handleTileClick(e) {
  const tile = e.currentTarget;

  if (tile && tile.clickable) {
    updateTile(tile);

    const tiles = getAllTiles();

    // Con cada click se comprueba si se ha ganado o si el tablero está lleno
    if (winGame(tile, tiles)) {
      disableAllTiles(tiles);
      showToast(
        `¡Enhorabuena, el jugador ${turn.player} ha hecho tres en raya! Ha ganado 300 puntos.`
      );

      addPoints(300);
    } else if (isBoardFull(tiles)) {
      endGame();
    } else {
      nextTurn();

      const turnSpan = document.querySelector(".spanValue");
      turnSpan.textContent = turn.player;
    }
  }
}

/**
 * Función que obtiene todas las casillas
 * @returns la lista de casillas
 */
function getAllTiles() {
  return Array.from(document.querySelectorAll(".square"));
}

/**
 * Función que actualiza la casilla clickada
 * @param {*} tile la casilla clickada
 */
function updateTile(tile) {
  tile.children[0].textContent = turn.value;
  tile.classList.add("clicked-square", "no-hover");
  tile.clickable = false;
}

/**
 * Función que se encarga de la condición de victoria en el juego
 * @param {*} currTile la casilla clickada
 * @param {*} tiles la lista de casillas
 * @returns
 */
function winGame(currTile, tiles) {
  const lineVictory =
    checkLineVictory(currTile, tiles, "x") ||
    checkLineVictory(currTile, tiles, "y");

  const diagonalVictory = checkDiagonalVictory(currTile, tiles);

  if (lineVictory || diagonalVictory) {
    const winningTiles = lineVictory || diagonalVictory;
    highlightWinningTiles(winningTiles);
    return true;
  }

  return false;
}

/**
 * Función que indica si la victoria es en una linea vertical u horizontal
 * @param {*} currTile la casilla clickada
 * @param {*} tiles la lista de casillas
 * @param {*} axis la dirección de la linea
 * @returns
 */
function checkLineVictory(currTile, tiles, axis) {
  const tilesInLine = tiles.filter((tile) => tile[axis] == currTile[axis]);

  if (tilesInLine.every((tile) => tile.textContent == currTile.textContent)) {
    return tilesInLine;
  }

  return null;
}

/**
 * Función que indica si la victoria es en una diagonal
 * @param {*} currTile la casilla clickada
 * @param {*} tiles la lista de casillas
 * @returns
 */
function checkDiagonalVictory(currTile, tiles) {
  const isMainDiagonal = currTile.x === currTile.y;
  const isReversedDiagonal = currTile.x + currTile.y === 2;

  const mainDiagonalTiles = tiles.filter((tile) => tile.x === tile.y);
  const reversedDiagonalTiles = tiles.filter((tile) => tile.x + tile.y === 2);

  const mainDiagonalVictory =
    isMainDiagonal &&
    mainDiagonalTiles.every(
      (tile) => tile.textContent === currTile.textContent
    );

  const reversedDiagonalVictory =
    isReversedDiagonal &&
    reversedDiagonalTiles.every(
      (tile) => tile.textContent === currTile.textContent
    );

  if (mainDiagonalVictory) {
    return mainDiagonalTiles;
  }

  if (reversedDiagonalVictory) {
    return reversedDiagonalTiles;
  }

  return null;
}

/**
 * Función que resalta las casillas de la victoria
 * @param {*} winningTiles la lista de las casillas ganadoras
 */
function highlightWinningTiles(winningTiles) {
  winningTiles.forEach((tile) => {
    tile.classList.add("winning-square");
  });
}

/**
 * Función que deshabilita todas las casillas
 * @param {*} tiles la lista de casillas
 */
function disableAllTiles(tiles) {
  tiles.forEach((tile) => {
    tile.clickable = false;
    tile.classList.add("no-hover");
  });
}

/**
 * Función que comprueba si el tablero esta lleno
 * @param {*} tiles la lista de casillas
 * @returns
 */
function isBoardFull(tiles) {
  return tiles.every((tile) => tile.textContent);
}

/**
 * Función musra el mensaje de fin de juego
 */
function endGame() {
  showToast("¡El juego ha acabado en empate!");
}
